import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { RandomBackground } from "./components/RandomBackground"
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Memoiries",
  description: "A personal memory app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RandomBackground />
        <div className="relative min-h-screen flex flex-col">
          {/*<nav className="bg-white bg-opacity-20 p-4">*/}
          {/*  <ul className="flex justify-center space-x-4">*/}
          {/*    <li>*/}
          {/*      <Link href="/" className="text-white hover:underline">*/}
          {/*        Submit*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link href="/view" className="text-white hover:underline">*/}
          {/*        View*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link href="/settings" className="text-white hover:underline">*/}
          {/*        Settings*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <Link href="/about" className="text-white hover:underline">*/}
          {/*        About*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</nav>*/}
          <main className="flex-grow flex items-center justify-center p-4">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  )
}