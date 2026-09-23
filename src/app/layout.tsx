import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
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
  title: "Mini Store",
  description: "A small demo storefront.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
        <CartProvider>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
