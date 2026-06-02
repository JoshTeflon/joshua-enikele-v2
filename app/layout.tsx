import type { Metadata } from "next";
import { Cascadia_Code } from "next/font/google";

import { Navigation, TopBar } from "@/components/ui";
import { duvel, duvelSans, duvelFlorale } from "@/fonts";

import "./globals.css";

const cascadiaCode = Cascadia_Code({
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-cascadia-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Enikele",
  description: "Personal portfolio website of Joshua Enikele, a software engineer specializing in frontend engineering and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${duvel.variable} ${duvelSans.variable} ${duvelFlorale.variable} ${cascadiaCode.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <TopBar />
        
        {children}

        <Navigation />
      </body>
    </html>
  );
}
