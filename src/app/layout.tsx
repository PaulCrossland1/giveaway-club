import "@/styles/globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { PropsWithChildren } from "react";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Giveaway.club",
  description:
    "The plug-and-play giveaway experience designed for creators and their communities."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-midnight text-sand antialiased">
        {children}
      </body>
    </html>
  );
}
