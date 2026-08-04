import type { Metadata } from "next";
import { Cascadia_Code } from "next/font/google";

import {
  SmoothScrollProvider,
  ScrollRoot,
} from "@/components/providers/smooth-scroll-provider";
import { Navigation, TopBar, IntroLoader, CustomCursor } from "@/components/ui";
import { duvel, duvelSans, duvelFlorale } from "@/fonts";

import "./globals.css";

const cascadiaCode = Cascadia_Code({
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-cascadia-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Enikele",
  description: "Joshua Enikele software engineer portfolio website.",
  appleWebApp: {
    title: "JoshuaEnikele",
    statusBarStyle: "default",
  },
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
      <body className="relative min-h-screen overflow-hidden">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.classList.add(t);}}catch(e){}})();`,
          }}
        />
        <SmoothScrollProvider>
          <IntroLoader />
          <TopBar />
          <ScrollRoot>{children}</ScrollRoot>
          <Navigation />
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
