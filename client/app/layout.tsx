import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";

const inter = Poppins({ weight:["100","400","700","900"],subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareBlock",
  description: "For Best Real Estate Ownership",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="shortcut icon" href="./blockShare.png" />
      </head>
      <body className={inter.className}>
        <NavigationBar/>
        {children}</body>
    </html>
  );
}
