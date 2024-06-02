import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
 
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], })
 
export const metadata: Metadata = {
  title: 'Linktree: Share your quick links!',
  description: 'Share your links to anyone!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
          >
        {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
