import type { Metadata } from 'next'
import React from 'react';

export const metadata: Metadata = {
  title: 'Linktr3 | Login',
  description: 'Share your links to anyone!',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
   { children }
   </main>
  )
}