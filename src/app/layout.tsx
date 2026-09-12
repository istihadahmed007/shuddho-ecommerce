import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shuddho.com.bd"),
  title: {
    default: "SHUDDHO (শুদ্ধ) - Pure & Authentic Everyday Essentials of Bengal",
    template: "%s | SHUDDHO (শুদ্ধ)",
  },
  description:
    "Certified pure Bangladeshi consumer goods. Discover 100% raw wood-pressed mustard oil, Sundarbans wild honey, Bilona cow ghee, artisanal spices, 21-herb botanical hair oils, and natural personal care.",
  keywords: [
    "SHUDDHO",
    "শুদ্ধ",
    "pure mustard oil Bangladesh",
    "sundarbans raw honey",
    "bilona cow ghee pabna",
    "herbal hair oil bangladesh",
    "kasundi",
    "organic pantry bangladesh",
    "chinigura rice dinajpur",
    "natural soap bangladesh",
  ],
  authors: [{ name: "SHUDDHO Naturals & Pantry" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://shuddho.com.bd",
    siteName: "SHUDDHO (শুদ্ধ)",
    title: "SHUDDHO (শুদ্ধ) - Pure & Authentic Everyday Essentials of Bengal",
    description:
      "Certified pure Bangladeshi consumer goods crafted with traditional authenticity and laboratory tested purity.",
    images: [{ url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&h=630&fit=crop&q=85", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHUDDHO (শুদ্ধ) - Pure & Authentic Everyday Essentials of Bengal",
    description:
      "Certified pure Bangladeshi consumer goods crafted with traditional authenticity.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#18221B] font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
