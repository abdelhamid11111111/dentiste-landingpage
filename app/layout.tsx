import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SanityLive } from "@/sanity/lib/live";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  // optional: weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Dental",
  description: "Dentisterie de précision suisse",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <SanityLive />
        {children} <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />{" "}
      </body>
    </html>
  );
}
