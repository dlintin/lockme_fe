import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "../components/AuthProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "LockMe - Focus First. Scroll Later.",
    description: "The iOS app that blocks your distractions until you earn your screen time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased bg-brand-cream text-brand-darkText dark:bg-brand-dark dark:text-brand-cream transition-colors duration-300`}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
