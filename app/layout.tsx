import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
const JetBrainMono = localFont({
    src: "./fonts/JetBrainsMono[wght].ttf",
    variable: "--font-jetbrain-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Protfolio Sophia Hmamouche",
    description: "Développeuse Fullstack",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head />
            <body
                className={`${JetBrainMono.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
