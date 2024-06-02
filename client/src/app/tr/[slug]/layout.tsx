import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

type Props = {
  params: { slug: string },
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${params.slug}'s profile`
  }
}

export default function UserTreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      { children }
    </div>
  )
}