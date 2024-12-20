import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/hooks/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import ErrorBoundary from "./(routes)/LoginErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/logo.svg",
                href: "/logo.svg",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex justify-center items-center h-screen scrollbar-hide overflow-scroll">
            <Providers>
                <Toaster position="bottom-center" closeButton />
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </Providers>
            {/* <Analytics /> */}
            <GoogleAnalytics gaId="G-3XFZ6JPC6D" />
            <SpeedInsights />
        </main>
    );
}
