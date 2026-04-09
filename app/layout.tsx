import type { Metadata } from "next";
import { Nosifer, Space_Grotesk } from "next/font/google";
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
