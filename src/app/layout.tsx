import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://prism-saas.vercel.app"),
  title: {
    default: "Prism — Modern SaaS Platform",
    template: "%s | Prism",
  },
  description:
    "Prism is the all-in-one SaaS platform for modern teams. Manage users, content, analytics, and your shop from one beautiful dashboard.",
  keywords: ["SaaS platform", "dashboard", "user management", "analytics", "team collaboration", "content management", "Next.js"],
  authors: [{ name: "Prism" }],
  creator: "Prism",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prism",
    title: "Prism — Modern SaaS Platform",
    description:
      "Prism is the all-in-one SaaS platform for modern teams. Manage users, content, analytics, and more from one beautiful dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism — Modern SaaS Platform",
    description:
      "Prism is the all-in-one SaaS platform for modern teams. Manage users, content, analytics, and more from one beautiful dashboard.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
