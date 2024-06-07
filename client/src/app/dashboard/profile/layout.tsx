import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import axios from "axios";
import { apiBase } from "@/constants";
import { cookies } from "next/headers";
import type { User } from "@/types";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authtoken");
    const { data }: { data: User } = await axios.get(
      apiBase + "/api/get-session",
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return {
      title: `Edit profile | ${data?.username}`,
    };
  } catch (err: any) {
    console.log(err);
    return {
      title: "Edit Profile",
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
