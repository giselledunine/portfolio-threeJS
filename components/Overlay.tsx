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
import { useEffect, useMemo, useState } from "react";
import ParcoursIcon from "./Icons/ParcoursIcon";
import GiselleIcon from "./Icons/GiselleIcon";
import Image from "next/image";
import {
    Idle,
    Walking,
    Jogging,
    Breakdance,
    Angry,
    Excited,
    Thankful,
    Greeting,
    AngrySimpleFace,
    JudgmentalSimpleFace,
    RegularSimpleFace,
    SadSimpleFace,
    ScaredSimpleFace,
    SmileSimpleFace,
    SurprisedSimpleFace,
} from "@/components/Icons";

gsap.registerPlugin(ScrollToPlugin);

export function Overlay({
    animation,
    setAnimation,
    section,
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
    gsap.registerPlugin(ScrollToPlugin);
    const scroll = useScroll();
    const baseActionsName = [
        { name: "idle", icon: Idle },
        { name: "walking", icon: Walking },
        { name: "greeting", icon: Greeting },
        { name: "breakdance", icon: Breakdance },
        { name: "angry", icon: Angry },
        { name: "excited", icon: Excited },
        { name: "jogging", icon: Jogging },
        { name: "thankful", icon: Thankful },
    ];
    const additiveActionsName = [
        { name: "regular", icon: RegularSimpleFace },
        { name: "smile", icon: SmileSimpleFace },
        { name: "judgmental", icon: JudgmentalSimpleFace },
        { name: "surprised", icon: SurprisedSimpleFace },
        { name: "sad", icon: SadSimpleFace },
        { name: "scared", icon: ScaredSimpleFace },
        { name: "angryFace", icon: AngrySimpleFace },
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

    const [isZoomed, setIsZoomed] = useState("none");
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setPosition({ x, y });
    };

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

    useEffect(() => {
        if (section !== 3) {
            setIsZoomed("none");
        }
    }, [section]);

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
            <motion.div
                id="accueil"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-[100vh] w-[100vw] sm:mb-0 flex justify-center items-end md:items-center">
                <div className="w-full md:max-w-sm lg:max-w-screen-md flex flex-col gap-12 p-8 md:p-0 justify-center items-center">
                    <NameIcon color={strokeColor} />
                    <div className="bg-primary py-2 px-4 rounded-xl md:ml-[100px]">
                        <b className="text-secondary lg:text-xl text-md">
                            Creative Web Developer
                        </b>
                    </div>
                    <p className="md:w-[500px] md:ml-[200px] text-md lg:text-lg">
                        Welcome to my Portfolio, everything you need to know
                        about my journey and my project is here :)
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
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6 mt-8 sm:mt-0 lg:gap-12 md:w-[55%] lg:w-[50%] p-8 md-p-0">
                    <ParcoursIcon
                        width="100%"
                        color={strokeColor}></ParcoursIcon>
                    <div className="flex flex-col gap-4 text-sm lg:text-lg">
                        <p>
                            I come from a fullstack web developer background, I
                            have graduated with a Tech Lead Master in Paris in
                            2023 after 3 years of internship in two different
                            companies as a fulltack Javascript Web developer.
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
                className="h-[100vh] w-[100vw]  sm:mb-0 flex justify-center p-8 md:p-[50px] lg:p-[100px]">
                <motion.div
                    className="flex items-end md:items-center justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    <div className="flex flex-col md:w-[50%] gap-6 lg:gap-12 justify-start">
                        <GiselleIcon
                            width="100%"
                            color={strokeColor}></GiselleIcon>
                        <div className="grid grid-rows-[repeat(3,auto)] gap-4">
                            <div>
                                <p className="text-sm md:text-md">
                                    Giselle is the first 3D character I did. She
                                    has been created on Blender. She is inspired
                                    by me and my graphique style.
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
                            <div className="flex justify-space-between gap-4 h-[100px]">
                                <motion.div
                                    onClick={() =>
                                        setIsZoomed((prev) =>
                                            prev == "image1" ? "none" : "image1"
                                        )
                                    }
                                    onMouseMove={handleMouseMove}
                                    animate={{
                                        scale: isZoomed == "image1" ? 6 : 1,
                                        zIndex: isZoomed == "image1" ? 50 : 10,
                                        x:
                                            isZoomed == "image1"
                                                ? (0.5 - position.x) * 100 + "%"
                                                : "0%",
                                        y:
                                            isZoomed == "image1"
                                                ? (-1 - position.y) * 100 + "%"
                                                : "0%",
                                    }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeOut",
                                        duration: 0.3,
                                    }}
                                    className="hover:cursor-pointer w-full h-full bg-gray-200 border-2 rounded-xl border-primary bg-[url(/process1.png)] bg-cover"></motion.div>
                                <motion.div
                                    onClick={() =>
                                        setIsZoomed((prev) =>
                                            prev == "image2" ? "none" : "image2"
                                        )
                                    }
                                    onMouseMove={handleMouseMove}
                                    animate={{
                                        scale: isZoomed == "image2" ? 7 : 1,
                                        zIndex: isZoomed == "image2" ? 100 : 10,
                                        width:
                                            isZoomed == "image2"
                                                ? "125px"
                                                : "100%",
                                        height:
                                            isZoomed == "image2"
                                                ? "100px"
                                                : "100%",
                                        x:
                                            isZoomed == "image2"
                                                ? (-4 - position.x) * 100 + "%"
                                                : "0%",
                                        y:
                                            isZoomed == "image2"
                                                ? (-1 - position.y) * 100 + "%"
                                                : "0%",
                                    }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeOut",
                                        duration: 0.3,
                                    }}
                                    className="w-full h-full bg-gray-200 hover:cursor-pointer border-2 rounded-xl border-primary bg-[url(/giselle-character.png)] bg-cover"></motion.div>
                                <motion.div
                                    onClick={() =>
                                        setIsZoomed((prev) =>
                                            prev == "image3" ? "none" : "image3"
                                        )
                                    }
                                    onMouseMove={handleMouseMove}
                                    animate={{
                                        scale: isZoomed == "image3" ? 6 : 1,
                                        zIndex: isZoomed == "image3" ? 60 : 10,
                                        x:
                                            isZoomed == "image3"
                                                ? (-2 - position.x) * 100 + "%"
                                                : "0%",
                                        y:
                                            isZoomed == "image3"
                                                ? (-1 - position.y) * 100 + "%"
                                                : "0%",
                                    }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeOut",
                                        duration: 0.3,
                                    }}
                                    className="h-full w-full hover:cursor-pointer bg-gray-200 border-2 rounded-xl border-primary bg-[url(/process3.png)] bg-cover bg-center bg-primary"></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <div
                id="socials"
                className="h-[100vh] w-[100vw] flex md:items-center">
                <motion.div
                    className="mt-36 md:mt-6 sm:mt-0 flex h-fit flex-wrap w-full justify-center items-center md:grid md:grid-cols-5 gap-4 md:gap-8 p-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    <a
                        className="w-12"
                        href="https://dribbble.com/Giselledunine"
                        target="blank">
                        <Image
                            src={"/dribbble-icon.svg"}
                            alt="dribbble"
                            width={80}
                            height={80}></Image>
                    </a>
                    <a
                        className="w-12"
                        href="https://www.linkedin.com/in/sophia-hmamouche/"
                        target="blank">
                        <Image
                            src={"/linkedin.svg"}
                            alt="linkedin"
                            width={80}
                            height={80}></Image>
                    </a>
                    <a
                        className="w-12"
                        href="https://www.behance.net/sophiahmamouche"
                        target="blank">
                        <Image
                            src={"/behance.png"}
                            alt="behance"
                            width={80}
                            height={80}></Image>
                    </a>
                    <a
                        className="w-12"
                        href="https://giselledunine.artstation.com/"
                        target="blank">
                        <Image
                            src={"/artstation.webp"}
                            alt="artstation"
                            width={80}
                            height={80}></Image>
                    </a>
                    <a
                        className="w-12"
                        href="https://github.com/giselledunine"
                        target="blank">
                        <Image
                            src={"/github.png"}
                            alt="artstation"
                            width={80}
                            height={80}></Image>
                    </a>
                </motion.div>
            </div>
            <div
                id="playground"
                className="h-[100vh] w-[100vw]  sm:mb-0 flex items-start md:items-center p-8 lg:p-[100px] ">
                <div className="grid grid-cols-1 grid-rows-[38%_24%_38%] md:grid-rows-none md:grid-cols-[1fr_2fr_1fr] w-full h-full md:h-fit">
                    <motion.div
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}>
                        <div>
                            <Button
                                className="w-fit text-sm"
                                variant={animation ? "default" : "outline"}
                                disabled={currentBaseAction !== "idle"}
                                onClick={() => setAnimation((prev) => !prev)}>
                                Wireframe
                            </Button>
                        </div>
                        <div className="flex-col bg-primary/20 p-2 md:p-4 rounded-xl">
                            <h2>Animations</h2>
                            <div className="flex justify-start flex-wrap gap-2">
                                {baseActionsName.map((el) => (
                                    <Button
                                        size={"icon"}
                                        key={el.name}
                                        className="capitalize text-sm md:w-fit sm:px-2"
                                        disabled={animationWithTimeout}
                                        variant={
                                            currentBaseAction === el.name
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            setCurrentBaseAction(
                                                el.name as BaseActionName
                                            )
                                        }>
                                        <el.icon></el.icon>
                                        <span className="hidden md:inline">
                                            {el.name}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col bg-primary/20 p-2 md:p-4 rounded-xl">
                            <h2>Faces</h2>
                            <div className="flex flex-wrap gap-2 justify-start">
                                {additiveActionsName.map((el) => (
                                    <Button
                                        size={"icon"}
                                        key={el.name}
                                        className="md:w-fit capitalize text-sm sm:px-4"
                                        disabled={animationWithTimeout}
                                        variant={
                                            currentAdditiveAction === el.name
                                                ? "default"
                                                : "outline"
                                        }
                                        //disabled={animation}
                                        onClick={() =>
                                            setCurrentAdditiveAction(
                                                el.name as AdditiveActionName
                                            )
                                        }>
                                        <el.icon></el.icon>
                                        <span className="hidden md:inline">
                                            {el.name == "angryFace"
                                                ? "Angry"
                                                : el.name}
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <div></div>
                    <motion.div
                        className="flex justify-center md:justify-end items-end md:items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}>
                        <p>Changing avatar outfits comming soon ...</p>
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
