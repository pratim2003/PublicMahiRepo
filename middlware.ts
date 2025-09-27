import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }: any) => {
        const { pathname } = req.nextUrl;

        // Allow APIs and public auth routes
        if (
          pathname.startsWith("/api") ||
          pathname === "/auth/jwt/sign-in" ||
          pathname === "/auth/jwt/sign-up"
        ) {
          return true;
        }

        // Allow some public pages
        if (
          pathname === "/" ||
          pathname === "/design" ||
          pathname === "/photojournalism" ||
          pathname === "/broadcast" ||
          pathname === "/components"
        ) {
          return true;
        }

        // For everything else → require auth
        return !!token;
      },
    },
  }
);

// ✅ Tell Next.js which routes use middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};