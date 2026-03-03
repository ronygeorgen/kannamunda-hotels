import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kannamundayil Residency | Luxurious Accommodation",
  description: "Nestled in the heart of Erattupetta and Poonjar, Kannamundayil Residency is a family-run tourist home that embodies the warmth and hospitality of Kerala.",
  icons: {
    icon: "/common/Kannamunda-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased min-h-screen flex flex-col bg-background text-[17px]`}
        style={{ fontFamily: "var(--font-jost), 'Jost', sans-serif" }}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
