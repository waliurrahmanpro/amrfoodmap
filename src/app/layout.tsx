import type { Metadata, Viewport } from "next";
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
  title: "Amar Food Map • আমার ফুড ম্যাপ | Bangladesh 64 Districts Culinary Map",
  description: "Explore authentic, iconic culinary heritage across all 64 districts of Bangladesh. Track foods you have tried, celebrate regional delicacies, and discover local gastronomic traditions.",
  keywords: ["Bangladesh food", "Amar Food Map", "Bangladeshi cuisine", "64 districts of Bangladesh", "Bogurar Doi", "Kachagolla", "Mezban", "Kala Bhuna", "Chomchom", "Ilish"],
  authors: [{ name: "Amar Food Map" }],
  openGraph: {
    title: "Amar Food Map • আমার ফুড ম্যাপ",
    description: "Explore and track famous culinary dishes across all 64 districts of Bangladesh.",
    type: "website",
    locale: "en_BD"
  }
};

export const viewport: Viewport = {
  themeColor: "#0C382E",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1C2723]">
        {children}
      </body>
    </html>
  );
}
