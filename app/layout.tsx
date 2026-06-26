import type { Metadata , Viewport } from "next";


import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "react-hot-toast";

import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Sanghvi Consultancy Services | AI Accounting & Financial Solutions",

  description:
    "Professional AI-powered accounting, GST filing, tax consultancy, business registration and financial services platform.",

  verification: {
    google:
      "ag7859UvtMhRv3kVwSDYxqURvEG1D5gr0A6MNrEIFnA",
  },

  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18392b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#18392b",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />

        {children}

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

      </body>

    </html>

  );

}