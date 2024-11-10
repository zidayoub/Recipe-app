import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CookBook - Recipe Explorer",
  description: "Explore and save your favorite recipes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#FFF5F7]`}>
        <main>{children}</main>
      </body>
    </html>
  )
}