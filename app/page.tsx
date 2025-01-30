"use client";

import { LegacyRef, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    AdditiveActionName,
    BaseActionName,
    Character,
} from "@/components/Gltf/Character";
//import { Character2, BaseActionName } from "@/components/Gltf/character2";
//import { Character3 } from "@/components/Gltf/character3";
import { CameraControls, ScrollControls, useScroll } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { Overlay } from "@/components/Overlay";
import Header from "@/components/Header";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { Stats } from "@react-three/drei";

type ExtendedScroll = ReturnType<typeof useScroll> & {
    scroll: {
        current: number;
    }; // Replace `any` with the correct type if known
};

export default function Home() {
    const controlsRef = useRef() as LegacyRef<CameraControls> | undefined;
    const [animation, setAnimation] = useState(false);
    const [section, setSection] = useState(0);

    return (
        <div className="w-[100vw] h-[100vh]">
            <Header section={section} onSectionChange={setSection} />
            <Canvas
                className="z-1"
                shadows
                camera={{
                    position: [0, 0, 10],
                    fov: 120,
                    zoom: 5,
                }}
                gl={{ localClippingEnabled: true }}>
                {/* <CameraMouvment animation={animation} /> */}
                <CameraControls
                    ref={controlsRef}
                    // minDistance={3} // Minimum distance for zoom
                    // maxDistance={20}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                    minDistance={5}
                    maxDistance={10}
                    enabled={section === 4 ? true : false}
                />
                <ScrollControls pages={5} damping={0.25}>
                    <ScrollManager
                        section={section}
                        onSectionChange={setSection}
                    />
                    <ScrollAnimation
                        animation={animation}
                        setAnimation={setAnimation}
                        section={section}
                        setSection={setSection}></ScrollAnimation>
                    {/* <ProjectsPortals /> */}
                </ScrollControls>
            </Canvas>
        </div>
    );
}

const ScrollAnimation = ({
    animation,
    setAnimation,
    section,
    setSection,
}: {
    animation: boolean;
    setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    section: number;
    setSection: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const ambientLightRef = useRef(new THREE.AmbientLight());
    const lightRef = useRef(new THREE.DirectionalLight());
    const { camera } = useThree();
    const { theme } = useTheme();
    const [currentBaseAction, setCurrentBaseAction] = useState<
        BaseActionName | "none"
    >("idle");
    const [currentAdditiveAction, setCurrentAdditiveAction] = useState<
        AdditiveActionName | "none"
    >("none");
    const currentRefAction = useRef("idle");
    const currentRefAdditiveAction = useRef("none");

    useFrame((_, delta) => {
        if (theme === "dark" && ambientLightRef.current) {
            easing.dampC(
                ambientLightRef.current.color,
                new THREE.Color("magenta"),
                1,
                delta
            );
        } else if (theme === "light" && ambientLightRef.current) {
            easing.dampC(
                ambientLightRef.current.color,
                new THREE.Color("yellow"),
                1,
                delta
            );
        }
        if (animation && ambientLightRef.current) {
            easing.dampC(
                ambientLightRef.current.color,
                new THREE.Color("pink"),
                0.9,
                delta
            );
        } else if (!animation && ambientLightRef.current) {
            easing.dampC(
                ambientLightRef.current.color,
                new THREE.Color("magenta"),
                0.9,
                delta
            );
        }
        if (lightRef.current) {
            // Synchronize the position of the light with the camera's position
            lightRef.current.position.copy(camera.position);
            // Optional: Adjust the direction of the light to always face forward
            lightRef.current.target.position.set(
                camera.position.x +
                    camera.getWorldDirection(new THREE.Vector3()).x,
                camera.position.y +
                    camera.getWorldDirection(new THREE.Vector3()).y,
                camera.position.z +
                    camera.getWorldDirection(new THREE.Vector3()).z
            );
            lightRef.current.target.updateMatrixWorld();
        }
    });

    return (
        <>
            <Stats />
            <directionalLight
                ref={lightRef}
                position={[0, 1, 3]}
                intensity={4}
                color={"oldlace"}></directionalLight>
            <ambientLight
                ref={ambientLightRef}
                intensity={1.5}
                color={"magenta"}></ambientLight>
            <Character
                scale={0.8}
                section={section}
                currentBaseAction={currentBaseAction}
                setCurrentBaseAction={setCurrentBaseAction}
                currentRefAction={currentRefAction}
                currentAdditiveAction={currentAdditiveAction}
                setCurrentAdditiveAction={setCurrentAdditiveAction}
                currentRefAdditiveAction={currentRefAdditiveAction}
                theme={theme}
                animation={animation}
                setAnimation={setAnimation}
                name={"normale"}
                isWireframe={false}></Character>
            {/* <Character2
                theme={theme}
                scale={0.8}
                rotation={[0, 0.4, 0]}
                position={[-4, -4.5, 0]}
                animation={animation}
                // currentAdditiveAction={currentBaseAction}
                // setCurrentAdditiveAction={setCurrentBaseAction}
                // currentBaseAction={currentBaseAction}
                // setCurrentBaseAction={setCurrentBaseAction}
                currentRefAction={currentRefAction}></Character2> */}
            <Character
                section={section}
                currentBaseAction={currentBaseAction}
                setCurrentBaseAction={setCurrentBaseAction}
                currentRefAction={currentRefAction}
                currentAdditiveAction={currentAdditiveAction}
                setCurrentAdditiveAction={setCurrentAdditiveAction}
                currentRefAdditiveAction={currentRefAdditiveAction}
                scale={0.8}
                theme={theme}
                animation={animation}
                setAnimation={setAnimation}
                isWireframe
                name={"wireframe"}></Character>
            <Overlay
                animation={animation}
                section={section}
                setSection={setSection}
                currentBaseAction={currentBaseAction}
                setCurrentBaseAction={setCurrentBaseAction}
                currentAdditiveAction={currentAdditiveAction}
                setCurrentAdditiveAction={setCurrentAdditiveAction}
                setAnimation={setAnimation}
            />
        </>
    );
};

// const CameraMouvment = ({ animation }: { animation: boolean }) => {
//     const { camera } = useThree();
//     const targetPosition = useMemo(() => new THREE.Vector3(-5, -1.5, 8), []);
//     const targetRotation = useMemo(
//         () => camera.rotation.y - Math.PI / 12,
//         [camera.rotation.y]
//     );

//     useFrame((_, delta) => {
//         if (animation) {
//             easing.damp3(camera.position, targetPosition, 0.5, delta);
//             easing.dampAngle(camera.rotation, "y", targetRotation, 0.5, delta);
//         } else {
//             easing.damp3(camera.position, [0, 0, 10], 0.5, delta);
//             easing.dampAngle(camera.rotation, "y", 0, 0.5, delta);
//         }
//     });
//     return null;
// };

const ScrollManager = (props: {
    section: number;
    onSectionChange: (section: number) => void;
}) => {
    const { scroll, fill, el, pages } = useScroll() as ExtendedScroll;
    const lastScroll = useRef(0);
    const isAnimation = useRef(false);
    const { section, onSectionChange } = props;

    fill.classList.add("top-0");
    fill.classList.add("absolute");

    useEffect(() => {
        gsap.to(el, {
            duration: 1,
            scrollTop: section * el.clientHeight,
            onStart: () => {
                isAnimation.current = true;
            },
            onComplete: () => {
                setTimeout(() => {
                    isAnimation.current = false;
                }, 150);
            },
        });
    }, [section, el]);

    useFrame(() => {
        if (isAnimation.current) {
            lastScroll.current = scroll.current;
            return;
        }
        const curSection = Math.floor(scroll.current * pages);

        if (scroll.current > lastScroll.current) {
            switch (curSection) {
                case 0:
                    return onSectionChange(1);
                case 1:
                    return onSectionChange(2);
                case 2:
                    return onSectionChange(3);
                case 3:
                    return onSectionChange(4);
            }
        }
        if (scroll.current < lastScroll.current && curSection === 0) {
            onSectionChange(0);
        }
        lastScroll.current = scroll.current;
    });
    return null;
};
