import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AppProviders from "./app-providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AppProviders children></AppProviders>
        <Script src="/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/smooth-scrollbar.js" strategy="lazyOnload" />
        <Script src="/js/splide.min.js" strategy="lazyOnload" />
        <Script src="/js/three.min.js" strategy="lazyOnload" />
        <Script src="/js/vanta.fog.min.js" strategy="lazyOnload" />
        <Script src="/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
