import { useCallback, useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MenuIcon, X } from "lucide-react";
import { useProgress } from "@react-three/drei";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";

export default function Header({
    section,
    onSectionChange,
}: {
    section: number;
    onSectionChange: (section: number) => void;
}) {
    const { theme, setTheme } = useTheme();
    const moonRef = useRef<HTMLDivElement>(null);
    const sunRef = useRef<HTMLDivElement>(null);
    gsap.registerPlugin(ScrollToPlugin);
    const header = useRef<HTMLDivElement>(null);
    const icon = useRef<HTMLDivElement>(null);
    const drawer = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [visibleHeader, setVisibleHeader] = useState(false);
    const [mouseOverMenu, setMouseOverMenu] = useState("");
    const body = useRef<HTMLCollectionOf<HTMLBodyElement>>();
    const menuIcon = useRef(null);
    const closeIcon = useRef(null);
    const [variables, setVariables] = useState({
        stroke: "#000",
        background: "#7e4e5440",
        opacityMoon: "opacity-100",
        opacitySun: "opacity-0",
    });
    const { progress } = useProgress();
    const progressRef = useRef({ value: 0 });
    const [displayProgress, setDisplayProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        gsap.to(progressRef.current, {
            value: progress, // Cible la valeur de Progress
            duration: 0.3,
            ease: "power2.out",
            onUpdate: function () {
                setDisplayProgress(Math.round(progressRef.current?.value)); // Met à jour l'affichage
            },
        });
        if (progress == 100) {
            setLoading(false);
        }
    }, [progress]);

    useEffect(() => {
        body.current = document.getElementsByTagName("body");
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            setVariables({
                stroke: "#FFFADE",
                background: "#FFBCC5",
                opacityMoon: "opacity-100",
                opacitySun: "opacity-0",
            });
        }
        if (theme === "light") {
            setVariables({
                stroke: "#000",
                background: "#7e4e5440",
                opacityMoon: "opacity-0",
                opacitySun: "opacity-100",
            });
        }
    }, [theme]);

    const iconAnimation = (action: boolean) => {
        if (icon.current?.children) {
            if (action) {
                gsap.to(icon.current.children, {
                    duration: 0.3,
                    filter: `drop-shadow(0px 0px 1mm ${
                        theme === "dark" ? "#FFFADE" : "#000"
                    })`,
                    ease: "power1.inOut",
                });
            } else {
                gsap.to(icon.current.children, {
                    duration: 0.3,
                    filter: "drop-shadow(0px 0px 0mm #FFFADE)",
                    ease: "power1.inOut",
                });
            }
        }
    };

    useEffect(() => {
        if (drawer.current && container.current) {
            if (open) {
                gsap.to(container.current, {
                    duration: 0.8,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    pointerEvents: "auto",
                    backdropFilter: "blur(12px)",
                });
                gsap.to(drawer.current, {
                    duration: 1,
                    right: "0",
                    ease: "power3.inOut",
                });
                gsap.to(menuIcon.current, {
                    duration: 1,
                    opacity: 0,
                    rotate: 180,
                    ease: "bounce",
                });
                gsap.to(closeIcon.current, {
                    duration: 1,
                    opacity: 1,
                    rotate: 180,
                    ease: "bounce",
                });
            } else {
                if (visibleHeader) {
                    gsap.to(drawer.current, {
                        duration: 1,
                        right: "-380px",
                        ease: "bounce",
                    });
                } else {
                    gsap.to(container.current, {
                        duration: 0.5,
                        pointerEvents: "none",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        backdropFilter: "blur(0px)",
                    });
                    gsap.to(drawer.current, {
                        duration: 1,
                        right: "-300px",
                        ease: "bounce",
                    });
                }
                gsap.to(menuIcon.current, {
                    duration: 1,
                    opacity: 1,
                    rotate: 0,
                    ease: "bounce",
                });
                gsap.to(closeIcon.current, {
                    duration: 1,
                    opacity: 0,
                    rotate: 0,
                    ease: "bounce",
                });
            }
        }
    }, [open, visibleHeader]);

    const animateLine = useCallback(
        (element: string) => {
            if (element !== "") {
                gsap.to(`#${element}`, {
                    duration: 1,
                    width: "100%",
                });
            } else {
                gsap.to(`#${mouseOverMenu}`, {
                    duration: 1,
                    width: "0",
                });
            }
            setMouseOverMenu(element);
        },
        [mouseOverMenu]
    );

    const menuElementActive = useCallback((element: string) => {
        [1, 2, 3, 4, 5].forEach((el) => {
            gsap.to(`#line${el}`, {
                duration: 1,
                width: "0%",
            });
        });
        gsap.to(`#${element}`, {
            duration: 1,
            width: "100%",
        });
    }, []);

    useEffect(() => {
        if (section > 0 && visibleHeader) {
            setVisibleHeader(false);
        }
        if (section === 0 && !visibleHeader) {
            setVisibleHeader(true);
        }

        menuElementActive(`line${section + 1}`);
    }, [section, visibleHeader, menuElementActive]);

    useEffect(() => {
        if (header.current) {
            if (!visibleHeader) {
                gsap.to(header.current, {
                    duration: 1,
                    opacity: 0,
                    ease: "power3.inOut",
                });
            } else {
                setOpen(false);
                gsap.to(header.current, {
                    duration: 1,
                    opacity: 1,
                    ease: "power3.inOut",
                });
            }
        }
    }, [visibleHeader]);

    const toggleDarkMode = () => {
        const timeline = gsap.timeline();
        if (sunRef.current && moonRef.current) {
            if (theme === "light") {
                setTheme("dark");

                timeline
                    .to(
                        sunRef.current,
                        {
                            rotation: "+=360", // Rotate 360 degrees
                            opacity: 0, // Fade out
                            duration: 1, // Half the animation duration
                            ease: "bounce.out",
                        },
                        0
                    )
                    .to(
                        moonRef.current,
                        {
                            rotation: "+=360", // Rotate 360 degrees
                            opacity: 1, // Fade out
                            duration: 1, // Half the animation duration
                            ease: "bounce.out",
                        },
                        0
                    )
                    .from(
                        document.body,
                        {
                            background:
                                "radial-gradient(48% 48% at center,#FFBCC5, #F0F2D7)",
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        0
                    )
                    .to(
                        document.body,
                        {
                            background:
                                "radial-gradient(48% 48% at center, #FFBCC5, #000000)",
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        0
                    );
            } else {
                setTheme("light");
                timeline
                    .to(
                        moonRef.current,
                        {
                            rotation: "+=360", // Rotate 360 degrees
                            opacity: 0, // Fade out
                            duration: 1, // Half the animation duration
                            ease: "bounce.out",
                        },
                        0
                    )
                    .to(
                        sunRef.current,
                        {
                            rotation: "+=360", // Rotate 360 degrees
                            opacity: 1, // Fade out
                            duration: 1, // Half the animation duration
                            ease: "bounce.out",
                        },
                        0
                    )
                    .from(
                        document.body,
                        {
                            background:
                                "radial-gradient(48% 48% at center,#FFBCC5, #000)",
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        0
                    )
                    .to(
                        document.body,
                        {
                            background:
                                "radial-gradient(48% 48% at center,#FFBCC5, #F0F2D7)",
                            duration: 1,
                            ease: "power2.inOut",
                        },
                        0
                    );
            }
        }
    };

    return (
        <div
            ref={container}
            className="absolute w-[100vw] h-[100vh] z-10 pointer-events-none backdrop-blur-none">
            {loading ? (
                <motion.div
                    initial={{ opacity: 0, y: -20 }} // Start animation (appear)
                    animate={{ opacity: 1, y: 0 }} // End animation
                    exit={{ opacity: 0, y: 20 }} // Exit animation (disappear)
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`absolute w-[100vw] h-[100vh] backdrop-blur-3xl bg-[${variables.background}] z-50 flex flex-col items-center justify-center`}>
                    <p>Loading</p>
                    <div className="flex w-fit items-center gap-2">
                        <Progress
                            value={displayProgress}
                            className="w-[200px]"
                        />
                        <span>{displayProgress}%</span>
                    </div>
                </motion.div>
            ) : null}
            <div
                ref={drawer}
                id="menuDrawer"
                className="flex gap-8 absolute justify-end h-full -right-[380px] z-20">
                <div
                    className="pointer-events-auto w-9 h-9 hover:cursor-pointer flex justify-center items-center bg-primary rounded-lg mt-8 ml-8"
                    onClick={() => setOpen((prev) => !prev)}
                    onMouseEnter={() => iconAnimation(true)}
                    onMouseLeave={() => iconAnimation(false)}>
                    <MenuIcon
                        ref={menuIcon}
                        className="text-secondary"></MenuIcon>
                    <X
                        ref={closeIcon}
                        className="absolute top-[38px] opacity-0 text-secondary"></X>
                </div>
                <div
                    className={`pointer-events-auto flex flex-col bg-background justify-center text-xl font-bold bg-[${variables.background}] w-[300px] z-50 `}>
                    <div className="flex flex-col gap-4 p-6">
                        <div
                            onClick={() => onSectionChange(0)}
                            onMouseEnter={() => animateLine("line1")}
                            onMouseLeave={() => animateLine("")}
                            className="hover:cursor-pointer flex gap-2 items-center">
                            <p>Home</p>
                            <div
                                id="line1"
                                className="w-0 h-[2px] bg-primary rounded-md"></div>
                        </div>
                        <div
                            onClick={() => onSectionChange(1)}
                            onMouseEnter={() => animateLine("line2")}
                            onMouseLeave={() => animateLine("")}
                            className="hover:cursor-pointer flex gap-2 items-center">
                            <p>Journey</p>
                            <div
                                id="line2"
                                className="w-0 h-[2px] bg-primary rounded-md"></div>
                        </div>
                        <div
                            onClick={() => onSectionChange(2)}
                            onMouseEnter={() => animateLine("line3")}
                            onMouseLeave={() => animateLine("")}
                            className="hover:cursor-pointer flex gap-2 items-center">
                            <p>Giselle</p>
                            <div
                                id="line3"
                                className="w-0 h-[2px] bg-primary rounded-md"></div>
                        </div>
                        <div
                            onClick={() => onSectionChange(3)}
                            onMouseEnter={() => animateLine("line4")}
                            onMouseLeave={() => animateLine("")}
                            className="hover:cursor-pointer flex gap-2 items-center">
                            <p>Socials</p>
                            <div
                                id="line4"
                                className="w-0 h-[2px] bg-primary rounded-md"></div>
                        </div>
                        <div
                            onClick={() => onSectionChange(4)}
                            onMouseEnter={() => animateLine("line5")}
                            onMouseLeave={() => animateLine("")}
                            className="hover:cursor-pointer flex gap-2 items-center">
                            <p>Playground</p>
                            <div
                                id="line5"
                                className="w-0 h-[2px] bg-primary rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="w-[100vw] h-[100px] md:flex justify-center hidden fixed top-0 z-10 pointer-events-auto">
                <div
                    ref={header}
                    className="flex gap-8 justify-center items-center invisible lg:visible">
                    <div
                        onClick={() => onSectionChange(0)}
                        className="hover:cursor-pointer">
                        <p className="text-primary">Home</p>
                    </div>
                    <div
                        onClick={() => onSectionChange(1)}
                        className="hover:cursor-pointer">
                        <p className="text-primary">Journey</p>
                    </div>
                    <div
                        onClick={() => onSectionChange(2)}
                        className="hover:cursor-pointer">
                        <p className="text-primary">Giselle</p>
                    </div>
                    <div
                        onClick={() => onSectionChange(3)}
                        className="hover:cursor-pointer">
                        <p className="text-primary">Socials</p>
                    </div>
                    <div
                        onClick={() => onSectionChange(4)}
                        className="hover:cursor-pointer">
                        <p className="text-primary">Playground</p>
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={toggleDarkMode}>
                        <div
                            className={`w-[40px] h-[40px] flex items-center justify-center absolute ${variables.opacityMoon}`}
                            ref={moonRef}>
                            <MoonIcon className={`moon text-primary`} />
                        </div>
                        <div
                            className={`w-[40px] h-[40px] flex items-center justify-center ${variables.opacitySun}`}
                            ref={sunRef}>
                            <SunIcon className={`sun text-primary`} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
