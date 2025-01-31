import { Scroll, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useTheme } from "next-themes";
import NameIcon from "./Icons/NameIcon";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { AdditiveActionName, BaseActionName } from "./Gltf/Character";
import { useEffect, useMemo, useRef, useState } from "react";
import ParcoursIcon from "./Icons/ParcoursIcon";
import GiselleIcon from "./Icons/GiselleIcon";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

export function Overlay({
    animation,
    setAnimation,
    // baseActions,
    // setBaseActions,
    // additiveActions,
    // setAdditiveActions,
    section,
    setSection,
    currentBaseAction,
    setCurrentBaseAction,
    currentAdditiveAction,
    setCurrentAdditiveAction,
}: {
    animation: boolean;
    setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    section: number;
    setSection: React.Dispatch<React.SetStateAction<number>>;
    currentBaseAction: BaseActionName | "none";
    setCurrentBaseAction: React.Dispatch<
        React.SetStateAction<BaseActionName | "none">
    >;
    currentAdditiveAction: AdditiveActionName | "none";
    setCurrentAdditiveAction: React.Dispatch<
        React.SetStateAction<AdditiveActionName | "none">
    >;
}) {
    const { theme } = useTheme();
    // const [text, setText] = useState("");
    // const [index, setIndex] = useState(0);
    //const [animationCursor, setAnimationCursor] = useState(false);
    gsap.registerPlugin(ScrollToPlugin);
    const scroll = useScroll();
    const baseActionsName = [
        "idle",
        "walking",
        "greeting",
        "breakdance",
        "angry",
        "excited",
        "jogging",
        "thankful",
    ];
    const additiveActionsName = [
        "smile",
        "judgmental",
        "surprised",
        "sad",
        "scared",
        "angryFace",
    ];

    const scrollToSection = () => {
        gsap.to(scroll.el, {
            duration: 1,
            scrollTo: scroll.el.clientHeight,
            ease: "power1.inOut",
        });
    };

    const dummySkills = useMemo(
        () => [
            {
                name: "Javascript",
                value: 0,
                target: 80,
            },
            {
                name: "ReactJS",
                value: 0,
                target: 80,
            },
            {
                name: "VueJs",
                value: 0,
                target: 70,
            },
            {
                name: "NextJs",
                value: 0,
                target: 80,
            },
            {
                name: "ThreeJs / Fiber",
                value: 0,
                target: 50,
            },
            {
                name: "Blender",
                value: 0,
                target: 70,
            },
            {
                name: "Figma",
                value: 0,
                target: 80,
            },
            {
                name: "GSAP",
                value: 0,
                target: 60,
            },
            {
                name: "Python",
                value: 0,
                target: 50,
            },
            {
                name: "PHP",
                value: 0,
                target: 75,
            },
            {
                name: "API Rest",
                value: 0,
                target: 80,
            },
            {
                name: "MongoDB",
                value: 0,
                target: 80,
            },
            {
                name: "AWS",
                value: 0,
                target: 60,
            },
        ],
        []
    );

    const [skills, setSkills] = useState(dummySkills);
    const [animationWithTimeout, setAnimationWithTimeout] = useState(false);
    const [strokeColor, setStrokeColor] = useState(
        theme === "dark" ? "#FFFADE" : "#000"
    );
    const image1 = useRef(null);
    const image2 = useRef(null);
    const image3 = useRef(null);
    const dribbble = useRef(null);
    const linkedin = useRef(null);
    const behance = useRef(null);
    const artstation = useRef(null);

    useEffect(() => {
        if (theme === "light") {
            setStrokeColor("#000");
        } else {
            setStrokeColor("#FFFADE");
        }
    }, [theme]);

    useEffect(() => {
        if (animation) {
            setAnimationWithTimeout(true);
        } else {
            setTimeout(() => setAnimationWithTimeout(false), 1800);
        }
    }, [animation]);

    useEffect(() => {
        gsap.from(dribbble.current, {
            y: -20, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
        });
        gsap.from(linkedin.current, {
            y: 10, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
        });
        gsap.from(behance.current, {
            y: -20, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
        });
        gsap.from(artstation.current, {
            y: 30, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
        });
        gsap.to(dribbble.current, {
            y: 20, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
            yoyo: true,
            repeat: -1,
            duration: 8,
        });
        gsap.to(linkedin.current, {
            y: -30, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
            yoyo: true,
            repeat: -1,
            duration: 8,
            delay: 0.2,
        });
        gsap.to(behance.current, {
            y: 40, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
            yoyo: true,
            repeat: -1,
            duration: 8,
            delay: 0.4,
        });
        gsap.to(artstation.current, {
            y: -20, // Moves the ball 20px down
            ease: "power1.inOut", // Smooth easing});
            yoyo: true,
            repeat: -1,
            duration: 8,
            delay: 0.6,
        });
    }, []);

    useEffect(() => {
        if (section == 1) {
            dummySkills.map((skill, index) => {
                gsap.to(skill, {
                    value: skill.target,
                    onUpdate: function () {
                        const updatedSkills = dummySkills.map((el) =>
                            el.name === skill.name
                                ? { ...el, value: skill.value }
                                : el
                        );
                        setSkills(updatedSkills); // Update the React state
                    },
                    delay: index * 0.15 + 0.5,
                    duration: 1,
                    ease: "back.out(2)",
                });
            });
        }
    }, [section, dummySkills]);

    // const fullText =
    //     "<b>Nom:</b> Sophia Hmamouche\n<b>Âge:</b> 23 ans\n<b>Passions:</b> Chant, Dessin, Animation, Guitar, Escalade";

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setAnimationCursor(true);
    //         if (index < fullText.length) {
    //             setText((prev) => prev + fullText[index]);
    //             setIndex((prev) => prev + 1);
    //         } else {
    //             clearInterval(interval); // Arrêter l'intervalle une fois terminé
    //         }
    //     }, 50);

    //     return () => {
    //         clearInterval(interval);
    //         setAnimationCursor(false);
    //     };
    // }, [animation, index, text]);

    return (
        <Scroll html>
            {/* <motion.div>
                <div>
                    <Progress value={}></Progress>
                </div>
            </motion.div> */}
            <motion.div
                id="accueil"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="h-[100vh] w-[100vw] flex justify-center items-end md:items-center">
                <div className="w-full md:max-w-sm lg:max-w-screen-md flex flex-col gap-12 p-8 md:p-0 justify-center items-center">
                    <NameIcon color={strokeColor} />
                    <div className="bg-primary py-2 px-4 rounded-xl md:ml-[100px]">
                        <b className="text-secondary lg:text-xl text-md">
                            Développeuse Web Créative
                        </b>
                    </div>
                    <p className="md:w-[500px] md:ml-[200px] text-md lg:text-lg">
                        Bienvenu, dans mon portfolio. Tout ce que vous avez
                        besoin de savoir sur moi et mon parcours professionnel
                        se trouve ici :)
                    </p>
                    <button onClick={scrollToSection}>
                        <ChevronDown></ChevronDown>
                    </button>
                </div>
            </motion.div>
            <div
                id="parcours"
                className="h-[100vh] w-[100vw] flex flex-col items-start jsutify-start md:justify-center gap-6 md:p-4 lg:p-[100px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col gap-6 mt-6 sm:mt-0 lg:gap-12 md:w-[55%] lg:w-[50%] p-8 md-p-0">
                    <ParcoursIcon
                        width="100%"
                        color={strokeColor}></ParcoursIcon>
                    <div className="flex flex-col gap-4 text-sm lg:text-lg">
                        <p>
                            Je viens d’une formation de dévelopeuse Web, j’ai
                            obtenu mon Master Tech Lead en 2023 après 3 ans
                            d’alternance en tant que dévelopeuse fullstack
                            Javascript.
                        </p>
                        <div className="grid grid-rows-[repeat(5,auto)] grid-cols-3 grid-flow-col gap-2 gap-x-4 sm:gap-x-4">
                            {skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="flex flex-col gap-2 h-fit">
                                    <p className="uppercase text-xs md:text-xs lg:text-lg">
                                        {skill.name}
                                    </p>
                                    <Progress
                                        value={skill.value}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            <div
                id="model"
                className="h-[100vh] w-[100vw] flex justify-center p-8 md:p-[50px] lg:p-[100px]">
                <motion.div
                    className="flex items-end md:items-center justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}>
                    <div className="flex flex-col md:w-[50%] gap-6 lg:gap-12 justify-start">
                        <GiselleIcon
                            width="100%"
                            color={strokeColor}></GiselleIcon>
                        <div className="grid grid-rows-[repeat(3,auto)] gap-4">
                            <div>
                                <p className="text-sm md:text-md">
                                    Giselle est le premier personnage 3d que
                                    j&apos;ai réalisé sur Blender. Elle est
                                    inspirée par moi et mon style graphique.
                                </p>
                            </div>
                            <div className="text-sm md:text-md">
                                <p>
                                    <b>Outils :</b> Blender
                                </p>
                                <p>
                                    <b>Riging :</b> Mixamo / Blender Addon
                                </p>
                                <p>
                                    <b>Texture :</b> Adobe 3d Substance
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div
                                    ref={image1}
                                    onMouseEnter={() =>
                                        gsap.to(image1.current, {
                                            scale: 4,
                                            duration: 1,
                                            transform: "translate(-50%, -100%)",
                                            zIndex: 50,
                                        })
                                    }
                                    onMouseLeave={() =>
                                        gsap.to(image1.current, {
                                            scale: 1,
                                            duration: 1,
                                            transform: "translate(0)",
                                            zIndex: 0,
                                        })
                                    }
                                    className="w-full h-full bg-gray-200 border-4 rounded-xl border-primary">
                                    <Image
                                        src={"/bioculture.jpeg"}
                                        alt="image1"
                                        width={120}
                                        height={120}></Image>
                                </div>
                                <div
                                    ref={image2}
                                    onMouseEnter={() =>
                                        gsap.to(image2.current, {
                                            scale: 4,
                                            duration: 1,
                                            transform:
                                                "translate(-150%, -100%)",
                                            zIndex: 50,
                                        })
                                    }
                                    onMouseLeave={() =>
                                        gsap.to(image2.current, {
                                            scale: 1,
                                            duration: 1,
                                            transform: "translate(0)",
                                            zIndex: 0,
                                        })
                                    }
                                    className="w-full h-full bg-gray-200 border-4 rounded-xl border-primary"></div>
                                <div
                                    ref={image3}
                                    onMouseEnter={() =>
                                        gsap.to(image3.current, {
                                            scale: 4,
                                            duration: 1,
                                            transform:
                                                "translate(-250%, -100%)",
                                            zIndex: 50,
                                        })
                                    }
                                    onMouseLeave={() =>
                                        gsap.to(image3.current, {
                                            scale: 1,
                                            duration: 1,
                                            transform: "translate(0)",
                                            zIndex: 0,
                                        })
                                    }
                                    className="bg-gray-200 border-4 rounded-xl border-primary"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div
                id="socials"
                className="h-[100vh] w-[100vw] flex items-center p-[100px]">
                <motion.div
                    className="mt-6 sm:mt-0 grid grid-cols-4 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}>
                    <a
                        ref={dribbble}
                        href="https://dribbble.com/Giselledunine"
                        target="blank">
                        <Image
                            src={"/dribbble-icon.svg"}
                            alt="dribbble"
                            width={100}
                            height={100}></Image>
                    </a>
                    <a
                        ref={linkedin}
                        href="https://www.linkedin.com/in/sophia-hmamouche/"
                        target="blank">
                        <Image
                            src={"/linkedin.svg"}
                            alt="linkedin"
                            width={100}
                            height={100}></Image>
                    </a>
                    <a
                        ref={behance}
                        href="https://www.behance.net/sophiahmamouche"
                        target="blank">
                        <Image
                            src={"/behance.png"}
                            alt="behance"
                            width={100}
                            height={100}></Image>
                    </a>
                    <a
                        ref={artstation}
                        href="https://giselledunine.artstation.com/"
                        target="blank">
                        <Image
                            src={"/artstation.webp"}
                            alt="artstation"
                            width={100}
                            height={100}></Image>
                    </a>
                </motion.div>
            </div>
            <div
                id="playground"
                className="h-[100vh] w-[100vw] flex items-start md:items-center p-8 lg:p-[100px] ">
                <div className="grid grid-cols-none grid-rows-[38%_24%_38%] md:grid-rows-none md:grid-cols-[38%_24%_38%] w-full h-full md:h-fit">
                    <motion.div
                        className="flex gap-4 grid grid-cols-3 md:grid-cols-1 flex-col mt-14 sm:mt-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}>
                        <div>
                            <Button
                                className="w-fit text-sm px-2 py-1 sm:px-4 py-2"
                                variant={animation ? "default" : "outline"}
                                disabled={currentBaseAction !== "idle"}
                                onClick={() => setAnimation((prev) => !prev)}>
                                Wireframe
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2>Animations</h2>
                            <div className="flex flex-wrap gap-2">
                                {baseActionsName.map((el) => (
                                    <Button
                                        key={el}
                                        className="w-fit capitalize text-sm px-2 py-1 sm:px-4 py-2"
                                        disabled={animationWithTimeout}
                                        variant={
                                            currentBaseAction === el
                                                ? "default"
                                                : "outline"
                                        }
                                        //disabled={animation}
                                        onClick={() =>
                                            setCurrentBaseAction(
                                                el as BaseActionName
                                            )
                                        }>
                                        {el}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2>Faces</h2>
                            <div className="flex flex-wrap gap-2">
                                {additiveActionsName.map((el) => (
                                    <Button
                                        key={el}
                                        className="w-fit capitalize text-sm px-2 py-1 sm:px-4 py-2"
                                        disabled={animationWithTimeout}
                                        variant={
                                            currentAdditiveAction === el
                                                ? "default"
                                                : "outline"
                                        }
                                        //disabled={animation}
                                        onClick={() =>
                                            setCurrentAdditiveAction(
                                                el as AdditiveActionName
                                            )
                                        }>
                                        {el == "angryFace" ? "Angry" : el}
                                    </Button>
                                ))}
                            </div>
                            <p>Changing avatar outfits comming soon ...</p>
                        </div>
                    </motion.div>
                    <div></div>
                    <motion.div
                        className="flex justify-center md:justify-end items-end md:items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}>
                        <Button
                            className="w-fit text-sm px-2 py-1 sm:px-4 py-2"
                            variant={"destructive"}
                            disabled={animation}
                            onClick={() => {
                                setSection(3);
                                setCurrentBaseAction("idle" as BaseActionName);
                            }}>
                            Leave Playground
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* <p
                className={`cursor-animation ${
                    animationCursor && "cursor-animation-play"
                }`}
                style={{
                    color: "#FFFADE",
                    whiteSpace: "pre-wrap",
                    width: "70vw",
                    height: "100vh",
                    paddingTop: "20%",
                    paddingLeft: "70%",
                    fontSize: "1.2rem",
                }}
                dangerouslySetInnerHTML={{ __html: text }}></p> */}
        </Scroll>
    );
}
