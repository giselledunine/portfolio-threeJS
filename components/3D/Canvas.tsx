import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";

export default function CanvasEmpty({ children }: { children: ReactNode }) {
    return <Canvas>{children}</Canvas>;
}
