import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GamificationProvider } from "@/lib/gamification-context.tsx"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
// <CHANGE> Added Tajawal font for Arabic text support
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
})

// <CHANGE> Updated metadata for La-Rouine platform
export const metadata: Metadata = {
  title: "La-Rouine | لاروين - منصة الشباب المحلية",
  description: "منصة اجتماعية محلية للشباب: فعاليات، تحديات، نوادي، ومنافسات مع نظام نقاط وشارات",
  generator: "v0.app",
  keywords: ["شباب", "فعاليات", "تحديات", "نوادي", "مجتمع محلي", "youth", "events", "challenges"],
  authors: [{ name: "La-Rouine Team" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
}

// <CHANGE> Added viewport configuration for PWA
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B35" },
    { media: "(prefers-color-scheme: dark)", color: "#FF8555" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} font-sans antialiased`}>
        <GamificationProvider>
          {children}
        </GamificationProvider>
        <Analytics />
      </body>
    </html>
  )
}
