import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE IAS LBSCEK",
  description: "Architecting Industrial Innovation Through Technical Excellence",
  icons: {
    icon: "/ias-stacked-logo.svg",
    shortcut: "/ias-stacked-logo.svg",
    apple: "/ias-stacked-logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
  