import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

import { apiBase } from "@/constants";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const authtoken = request.cookies.get("authtoken")?.value;
  const pathname = request.nextUrl.pathname;

  // Helper function to verify token
  const verifyToken = async (token: string) => {
    try {
      const { data } = await axios.get(`${apiBase}/api/get-session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Token verification error:", error.message);
      return null;
    }
  };

  // Redirect to dashboard if accessing root and authenticated
  if (pathname === "/" || pathname === '/login' || pathname === '/signup') {
    if (authtoken) {
      const user = await verifyToken(authtoken);
      if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // Check for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authtoken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const user = await verifyToken(authtoken);
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
