import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { User } from '@/types';
import axios from 'axios';

import { apiBase } from '@/constants'

const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const authtoken = request.cookies.get("authtoken")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const { data }: { data: User } = await axios.get(`${apiBase}/api/get-session`, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    });

    if (data) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error: any) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}