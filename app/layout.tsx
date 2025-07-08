import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import DiscountModal from "@/components/discount-modal";
import Logo from "@/lib/Logo";
import WhatsAppButton from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

const dreamOrphans = localFont({
  src: "../lib/fonts/dream-orphans.woff2",
  display: "swap",
  variable: "--font-dream-orphans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Servana Circle - Unlock the Circle. Live the Privilege.",
  description:
    "Discover Dubai's most luxurious lifestyle experiences, designed for those who settle for nothing less than extraordinary.",
  generator: "Next.js",
  applicationName: "Servana Circle",
  // image
  openGraph: {
    images: [
      {
        url: "https://servanacircle.netlify.app/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Servana Circle - Unlock the Circle. Live the Privilege.",
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
    <html lang="en" className={dreamOrphans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={`${inter.className} antialiased`}>
        <DiscountModal />
        <ThemeProvider defaultTheme="system" storageKey="servana-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
