import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import axios from "axios";
import { apiBase } from "@/constants";
type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { data } = await axios.post(apiBase + "/api/get-user", {
      username: params.slug,
    });
    return {
      title: `${data?.user.username}'s linktr3 profile 🌲`,
    };
  } catch (err: any) {
    console.log(err);
    return {
      title: "404 User not found!",
    };
  }
}

export default function UserTreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
