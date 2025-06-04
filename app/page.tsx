"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
//     EffectComposer,
//     Pixelation,
//     Bloom,
//     DepthOfField,
// } from "@react-three/postprocessing";
// import { BlendFunction, KernelSize } from "postprocessing";
import {
    AdditiveActionName,
    BaseActionName,
    Character,
} from "@/components/Gltf/Character";
import { CameraControls, ScrollControls, useScroll } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { Overlay } from "@/components/Overlay";
import Header from "@/components/Header";
import { useTheme } from "next-themes";
import gsap from "gsap";
//import { Stats } from "@react-three/drei";

type ExtendedScroll = ReturnType<typeof useScroll> & {
    scroll: {
        current: number;
        onChange: (el: () => void) => void;
    }; // Replace `any` with the correct type if known
};

// const PixelationShader = {
//     uniforms: {
//         tDiffuse: { value: null },
//         resolution: { value: [window.innerWidth, window.innerHeight] },
//         pixelSize: { value: 6.0 }, // Adjust pixel size to match old screen resolution
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       varying vec2 vUv;
//       uniform sampler2D tDiffuse;
//       uniform vec2 resolution;
//       uniform float pixelSize;

//       void main() {
//         vec2 dxy = pixelSize / resolution;
//         vec2 coord = dxy * floor(vUv / dxy);
//         vec4 color = texture2D(tDiffuse, coord);

//         // Fake monochrome / sepia color limitation
//         float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114)); // Convert to grayscale
//         vec3 minitelColor = vec3(gray, gray * 0.9, gray * 0.7); // Adds a slight sepia tone

//         gl_FragColor = vec4(minitelColor, color.a);
//       }
//     `,
// };

export default function Home() {
    const controlsRef = useRef<CameraControls>(null);
    const [animation, setAnimation] = useState(false);
    const [section, setSection] = useState(0);
    //const pixelationPass = useMemo(() => new ShaderPass(PixelationShader), []);

    useEffect(() => {
        if (section != 4 && controlsRef.current) {
            controlsRef.current.reset();
        }
    }, [section]);

    return (
        <div className="w-[100vw] h-[100vh] relative overflow-hidden">
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
                {/* <EffectComposer>
                    <Pixelation granularity={3}></Pixelation>
                    <Bloom
                        intensity={0.5} // Intensité de l'effet
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.2}
                        kernelSize={KernelSize.MEDIUM}
                        blendFunction={BlendFunction.ADD} // Mode de fusion
                    />
                    <DepthOfField
                        focusDistance={0} // Distance de mise au point
                        focalLength={0.15} // Intensité de l'effet
                        bokehScale={3} // Taille du flou
                    />
                </EffectComposer> */}
                <CameraMouvment animation={animation} section={section} />
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
    //const particlesGeometry = new THREE.PlaneGeometry(20, 10, 64, 32);
    const particleTexture = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        return textureLoader.load("/textures/particles/2.png");
    }, []);
    const mouseRef = useRef({ x: 0, y: 0 });
    const { scroll } = useScroll() as ExtendedScroll;
    const lastScroll = useRef(0);
    const lerpFactor = 0.05;
    const pointsRef = useRef(new THREE.Points());
    const uniforms = useRef({
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // Position initiale de la souris en UV
        uTexture: { value: particleTexture },
        uColor: { value: new THREE.Color("#fffadb") },
        uScroll: { value: 0 },
    }).current;

    useEffect(() => {
        const updateMouse = (event: MouseEvent) => {
            const x = event.clientX / window.innerWidth;
            const y = 1 - event.clientY / window.innerHeight;
            mouseRef.current = { x, y };
            uniforms.uMouse.value.set(x, y);
        };
        window.addEventListener("mousemove", updateMouse);
        return () => {
            window.removeEventListener("mousemove", updateMouse);
        };
    }, [uniforms.uMouse]);

    useFrame((_, delta) => {
        // console.log("vscroll", vScroll.current);
        uniforms.uScroll.value =
            Math.abs(scroll.current - lastScroll.current) * 30;
        lastScroll.current = scroll.current;

        if (pointsRef.current) {
            // Appliquer une rotation inverse à la caméra
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(
                pointsRef.current.rotation.y,
                -mouseRef.current.y * 0.1,
                lerpFactor
            );
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(
                pointsRef.current.rotation.x,
                mouseRef.current.x * 0.1,
                lerpFactor
            );
        }
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

    // const particlesMaterial = useMemo(() => {
    //     return new THREE.ShaderMaterial({
    //         uniforms,
    //         vertexShader: `
    //             varying vec2 vUv;
    //             uniform vec2 uMouse;
    //             uniform float uScroll;

    //             void main() {
    //                 vUv = uv;
    //                 vec3 newPosition = position;
    //                 vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    //                 float dist = distance(uv, uMouse);

    //                 float size = mix(0.1, 20.0, smoothstep(0.2, 0.0, dist));

    //                 gl_PointSize = mix(1.0, 5.0, uScroll);
    //                 gl_PointSize *= size;
    //                 // gl_PointSize *= (1.0 / -mvPosition.z);
    //                 gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    //             }
    //         `,
    //         fragmentShader: `
    //             precision mediump float;
    //             uniform sampler2D uTexture;
    //             uniform vec3 uColor;

    //             void main() {
    //                 vec4 texColor = texture2D(uTexture, gl_PointCoord);
    //                 float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    //                 if (brightness < 0.1) discard;
    //                 gl_FragColor = vec4(texColor.rgb * uColor, texColor.a);
    //             }
    //         `,
    //         transparent: true,
    //         depthWrite: false,
    //         blending: THREE.NormalBlending,
    //     });
    // }, [uniforms]);

    return (
        <>
            {/* <Stats /> */}
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
            {/*<points
                ref={pointsRef}
                geometry={particlesGeometry}
                position={[0, 0, -3]}
                material={particlesMaterial}
            />*/}
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

const CameraMouvment = ({
    section,
}: {
    animation: boolean;
    section: number;
}) => {
    const { camera } = useThree();
    const targetPosition = useMemo(() => new THREE.Vector3(0, 0, 10), []);
    const targetRotation = useMemo(() => 0, []);

    useFrame((_, delta) => {
        if (section !== 4) {
            easing.damp3(camera.position, targetPosition, 0.5, delta);
            easing.dampAngle(camera.rotation, "y", targetRotation, 0.5, delta);
            easing.dampAngle(camera.rotation, "x", targetRotation, 0.5, delta);
            easing.dampAngle(camera.rotation, "z", targetRotation, 0.5, delta);
        }
    });
    return null;
};

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
