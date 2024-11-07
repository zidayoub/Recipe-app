import { LogIn } from "lucide-react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
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
        <header className="sticky top-0 z-50 w-full border-b bg-white lg:px-40">
          <div className="container flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#FF4E7C]">CookBook.</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-[#FF4E7C] text-black"
              >
                HOME
              </Link>
              <Link
                href="/favorites"
                className="text-sm font-medium transition-colors hover:text-[#FF4E7C] text-black"
              >
                FAVORITES
              </Link>
            </nav>
            <Link
              href="/login"
              className="ml-4"
            >
              <LogIn className="h-6 w-6" />
              <span className="sr-only">Login</span>
            </Link>
          </div>
        </header>
        <main className="lg:px-40">{children}</main>
        <footer className="text-center py-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CookBook. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}