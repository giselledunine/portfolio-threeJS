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
    title: "Portfolio Sophia Hmamouche",
    description: "Développeuse Fullstack",
    twitter: {
        card: "summary_large_image",
        title: "Portfolio Sophia Hmamouche",
        description: "3d Portfolio of Sophia Hmamouche",
        siteId: "1467726470533754880",
        creator: "@nextjs",
        creatorId: "1467726470533754880",
        images: ["https://3d.sophiahmamouche.com/twitterCard.png"], // Must be an absolute URL
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${JetBrainMono.variable} ${geistMono.variable} antialiased overflow-hidden`}>
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
