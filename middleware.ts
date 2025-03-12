import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token")?.value;

  const currentPath = req.nextUrl.pathname;

  // If user is logged in and trying to access login page ("/"), redirect to "/Home"
  if (session && currentPath === "/") {
    return NextResponse.redirect(new URL("/Home", req.url));
  }

  // If user is NOT logged in and trying to access "/Home" or any path starting with "/Organization", redirect to "/"
  if (
    !session &&
    (currentPath === "/Home" || currentPath.startsWith("/Organization"))
  ) {
    console.log(session);
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
