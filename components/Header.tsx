//Icons
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
    return (
        <header className="flex justify-center font-medium text-xl items-center max-w-[1000px] h-full w-full gap-16">
            <Link className="image-link" href="/">
                <Image
                    className="dark:invert"
                    src={"/icon.svg"}
                    alt="icon"
                    width={50}
                    height={40}
                />
            </Link>
            <a href="#skills" className="menu-link">
                Compétences
            </a>
            <a href="#experience" className="menu-link">
                Expériences
            </a>
            <a href="#projects" className="menu-link">
                Projects
            </a>
            <ModeToggle />
        </header>
    );
}
