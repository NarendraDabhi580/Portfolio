import type { Metadata } from "next";
// @ts-ignore - Local module resolution bypassed for Vercel deploy
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Narendra | Frontend Developer — Digital Universe",
  description:
    "Narendra Dabhi — An immersive portfolio experience. Frontend Developer crafting full-stack applications with React, Node.js, MongoDB, and Express. Step into a cinematic digital universe.",
  keywords: [
    "Narendra Dabhi",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "3D Portfolio",
    "WebGL Portfolio",
  ],
  authors: [{ name: "Narendra Dabhi" }],
  openGraph: {
    title: "Narendra | Frontend Developer",
    description:
      "Immersive 3D portfolio — An award-winning digital experience by Narendra Dabhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="noise-overlay">
        <div className="scanline" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
