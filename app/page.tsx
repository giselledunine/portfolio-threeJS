import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
    return (
        <div className="grid grid-rows-[127px_1fr_auto] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-geist-sans)]">
            <Header />

            <main className="flex flex-col row-start-2 gap-[200px] max-w-[1440px] items-center w-full h-full ">
                <div className="flex flex-col items-center gap-8 bg-radial-gradient from-orange-300 to-white-500">
                    <Image
                        className="dark:invert w-full sm:w-[60%] 2xl:w-[60%] max-w-[1200px]"
                        src="/name.svg"
                        alt="Sophia Hmamouche"
                        width={280}
                        height={180}
                        priority
                    />
                    <div className="flex items-center gap-16 justify-between sm:w-[80%] ">
                        <Image
                            className="dark:invert w-[30%] max-w-[400px]"
                            src="/portfolio-profil.svg"
                            alt="Sophia Logo"
                            width={280}
                            height={180}
                            priority
                        />
                        <div className="flex flex-col gap-8 sm:text-xl max-w-2xl">
                            <Button
                                variant={"shiny"}
                                className="sm:text-xl w-fit h-fit rounded-2xl">
                                Dévelopeuse Fullstack Créative
                            </Button>

                            <p className="w-full">
                                Bienvenu, dans mon portfolio. Tout ce que vous
                                avez besoin de savoir sur moi et mon parcours
                                professionnel se trouve ici :)
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    id="skills"
                    className="scroll-my-[50px] flex flex-wrap gap-4 w-2/3">
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full">Développement Web</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                JAVASCRIPT
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                HTML/CSS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                PHP
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                PYTHON
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full">Conception 3D</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                three.js
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                Blender
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full">Frameworks</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                REACT.JS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                VUE.JS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                SVELTE
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                EXPRESS.JS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                VITE
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                NEXT.JS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                CAKE
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                SYMPHONY
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full">Outils Front</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                GSAP
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                tailwind
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                material.ui
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                vuetify
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                Shadcn
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full">Outils Back</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                Zustand
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                Next-auth
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                axios
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                JWT
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                ETC...
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">Database</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                Mongodb
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                PostgreSQL/SQL
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                FIREBASE
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                AWS
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                ETC...
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">Testing</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                jest
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                cypress
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">Devops</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                Git
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                jira
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">
                            Gestion de projets
                        </Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                Méthode agile
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                scrum
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                kanban
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                sprint
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">
                            Déploiement
                        </Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                DOCKER
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                Git action
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                git corkflow
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                cloud formations
                            </Button>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col gap-2">
                        <Button className="w-full uppercase">UX/UI</Button>
                        <div className="flex gap-2">
                            <Button className="uppercase" variant={"outline"}>
                                Figma
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                photoshop
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                indesign
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                after-effect
                            </Button>
                            <Button className="uppercase" variant={"outline"}>
                                ETC...
                            </Button>
                        </div>
                    </div>
                </div>

                {/* <div
                    id="experience"
                    className="grid grid-cols-[auto_auto_1fr] grid-rows-[repeat(60,auto)] w-2/3 scroll-my-[50px]">
                    <div className=" col-start-2 row-start-1 row-end-[61] px-4">
                        <div className="w-[20px] h-full bg-primary rounded-xl"></div>
                    </div>
                    <div className=" col-start-2 row-start-1 row-end-[13] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[32px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-1 row-start-1 row-end-13">
                        <div className="sticky top-20 text-2xl font-extrabold">
                            2024
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[13] row-end-[25] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[32px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-1 row-start-[13] row-end-[25]">
                        <div className="sticky top-20 text-2xl font-extrabold">
                            2023
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[25] row-end-[37] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[32px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-1 row-start-[25] row-end-[37]">
                        <div className="sticky top-20 text-2xl font-extrabold">
                            2022
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[37] row-end-[49] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[32px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-1 row-start-[37] row-end-[49]">
                        <div className="sticky top-20 text-2xl font-extrabold">
                            2021
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[49] row-end-[61] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[32px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-1 row-start-[49] row-end-[61]">
                        <div className="sticky top-20 text-2xl font-extrabold">
                            2020
                        </div>
                    </div>
                    <div className=" col-start-3 row-start-1 row-end-[2] flex flex-col gap-3 p-4"></div>
                    <div className=" col-start-2 row-start-2 row-end-[16] px-4">
                        <div className="w-[20px] h-full bg-orange-300 rounded-xl"></div>
                    </div>
                    <div className=" col-start-2 row-start-2 row-end-[16] flex justify-center items-start">
                        <div className="w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-2 row-end-[16] flex flex-col gap-3 p-4">
                        <div className="flex gap-2 items-center">
                            <Image
                                className="dark:invert"
                                src="/portfolio-profil.svg"
                                alt="Sophia Logo"
                                width={40}
                                height={40}
                                priority
                            />
                            <div>Freelance</div>
                        </div>
                        <div>
                            <Button variant={"shiny"}>
                                octobre 2023 - aujourd&apos;hui
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                Développeuse Web full-stack en freelance
                                depuis&apos; l&apos;obtention de mon diplôme
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                STACK
                            </Button>
                            <p>
                                REACTJS / VUEJS / NEXTJS / NODEJS / PHP / VITEJS
                                / JEST / DOCKER / GITHUB / BLENDER
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                MISSIONS
                            </Button>
                            <ul>
                                <li>Maintenance d&apos;anciens projects</li>
                                <li>Création 3D</li>
                                <li>Site vitrine et outils de gestion</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[15] row-end-[16] flex justify-center items-end">
                        <div className="w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-2 row-start-[16] row-end-[23] px-4">
                        <div className="w-[20px] h-full bg-orange-300 rounded-xl"></div>
                    </div>
                    <div className=" col-start-2 row-start-[16] row-end-[17] flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[16] row-end-[23] flex flex-col gap-3 p-4">
                        <div className="flex gap-2 items-center ">
                            <Image
                                className="rounded-md"
                                src="/withings.png"
                                alt="Sophia Logo"
                                width={40}
                                height={40}
                                priority
                            />
                            <div>Withings</div>
                        </div>
                        <div>
                            <Button variant={"shiny"}>
                                mars 2023 - septembre 2024
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                Développeuse Web full-stack en alternance au
                                sein de la team Web-app de Withings
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                STACK
                            </Button>
                            <p>
                                REACTJS / NODEJS / PHP / VITEJS / JEST / DOCKER
                                / GITHUB
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                MISSIONS
                            </Button>
                            <ul>
                                <li>
                                    Refonte de la totalité d’une application en
                                    interne
                                </li>
                                <li>
                                    Recherches de solutions techniques adaptées
                                    aux besoin avec des solutions modernes
                                </li>
                                <li>Choix UI/UX pertinents</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[22] row-end-[23] flex justify-center items-end">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[23] row-end-[24] flex flex-col gap-3 p-4"></div>
                    <div className=" col-start-2 row-start-[24] row-end-[28] px-4">
                        <div className="w-[20px] h-full bg-orange-300 rounded-xl"></div>
                    </div>
                    <div className=" col-start-2 row-start-[24] row-end-[25] flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[24] row-end-[28] flex flex-col gap-3 p-4">
                        <div className="flex gap-4 items-center">
                            <Image
                                className="rounded-md"
                                src="/bridge.jpeg"
                                alt="Sophia Logo"
                                width={40}
                                height={40}
                                priority
                            />
                            <div>Bridge</div>
                        </div>
                        <div>
                            <Button variant={"shiny"}>
                                octobre 2023 - janvier 2024
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                DéveloppeuseBack-end support en alternance au
                                sein de Bridge API
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                STACK
                            </Button>
                            <p>NODEJS</p>
                            <Button variant={"outline"} className="w-fit">
                                MISSIONS
                            </Button>
                            <ul>
                                <li>
                                    Refonte de la totalité d’une application en
                                    interne
                                </li>
                                <li>
                                    Recherches de solutions techniques adaptées
                                    aux besoin avec des solutions modernes
                                </li>
                                <li>Choix UI/UX pertinents</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[27] row-end-[28] flex justify-center items-end">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[28] row-end-[31] flex flex-col gap-3 p-4"></div>
                    <div className=" col-start-2 row-start-[31] row-end-[53] px-4">
                        <div className="w-[20px] h-full bg-orange-300 rounded-xl"></div>
                    </div>
                    <div className=" col-start-2 row-start-[31] row-end-[32] z-10 flex justify-center items-start">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[31] row-end-[53] flex flex-col gap-3 p-4">
                        <div className="flex gap-4 items-center">
                            <Image
                                className="rounded-md"
                                src="/bioculture.jpeg"
                                alt="Sophia Logo"
                                width={40}
                                height={40}
                                priority
                            />
                            <div>Bioculture</div>
                        </div>
                        <div>
                            <Button variant={"shiny"}>
                                septembre 2023 - juillet 2024
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                DéveloppeuseBack-end support en alternance au
                                sein de Bridge API
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                STACK
                            </Button>
                            <p>
                                REACTJS / NODEJS / API-REST / EXPRESSJS / AWS /
                                MATERIALUI / GITHUB
                            </p>
                            <Button variant={"outline"} className="w-fit">
                                MISSIONS
                            </Button>
                            <ul>
                                <li>
                                    Refonte de la totalité d’une application en
                                    interne
                                </li>
                                <li>
                                    Recherches de solutions techniques adaptées
                                    aux besoin avec des solutions modernes
                                </li>
                                <li>Choix UI/UX pertinents</li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-start-2 row-start-[52] row-end-[53] flex justify-center items-end">
                        <div className="sticky top-20 w-[32px] h-[22px] bg-primary rounded-2xl border-[6px] border-background"></div>
                    </div>
                    <div className=" col-start-3 row-start-[53] row-end-[61] flex flex-col gap-3 p-4"></div>
                </div> */}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
