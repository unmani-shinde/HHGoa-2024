import React from "react";
import type { Metadata } from "next";
import NavigationBar from "@/components/NavigationBar";
import { Web3Provider } from "@/providers/Web3Provider";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ weight: ["100", "400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareBlock",
  description: "Built for Smooth Real Estate Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Web3Provider>
          <NavigationBar />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
