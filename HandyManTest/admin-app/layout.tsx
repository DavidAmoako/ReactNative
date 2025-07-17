import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TheHandyMan Admin - Platform Administration",
  description: "Administrative dashboard for TheHandyMan platform management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
