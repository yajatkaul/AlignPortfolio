//@ts-nocheck
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authUrl = "http://localhost:5000/api/auth/checkAuth";
  const publicRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/home"];
  const employeeRoutes = ["/siteUpload"];

  try {
    const res = await fetch(authUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
    });

    const data = await res.json();
    const { pathname } = request.nextUrl;

    // If the user is not authenticated, redirect to login for protected or employee routes
    if (!data.exists || !data.result) {
      if (
        protectedRoutes.some((route) => pathnameMatches(route, pathname)) ||
        employeeRoutes.some((route) => pathnameMatches(route, pathname))
      ) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // If the user is authenticated but does not have the "Employee" role, redirect them from employee routes to the home page
    if (data.exists && data.result && !data.roles.includes("Employee")) {
      if (employeeRoutes.some((route) => pathnameMatches(route, pathname))) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // If the user is authenticated, prevent access to public routes like /login or /signup
    if (data.exists && data.result) {
      if (publicRoutes.some((route) => pathnameMatches(route, pathname))) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    console.error("Error during authentication check:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Function to match routes with potential wildcards
function pathnameMatches(route, pathname) {
  const regex = new RegExp(`^${route.replace(":path*", ".*")}$`);
  return regex.test(pathname);
}

export const config = {
  matcher: ["/home", "/login", "/signup", "/siteUpload"],
};
