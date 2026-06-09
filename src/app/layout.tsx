import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus â€” Modern SaaS Platform",
  description: "Manage users, content, and analytics from one beautiful dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-gray-900">
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}

