import type { Metadata } from "next";
import { Nosifer, Space_Grotesk } from "next/font/google";

import { Navigation, TopBar } from "@/components/ui";

import "./globals.css";

const nosifer = Nosifer({
  weight: "400",
  variable: "--font-nosifer",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
      className={`${nosifer.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="p-6 xl:p-8 min-h-full flex flex-col justify-between">
        <TopBar />
        
        {children}

        <header className="mt-auto">
          <Navigation />
        </header>
      </body>
    </html>
  );
}
