import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
	const supabase = createClient();
	const { pathname } = request.nextUrl;
	// update user's auth session
	const { data, error } = await supabase
		.from("users")
		.select("role")
		.eq("uuid", (await supabase.auth.getUser()).data.user?.id);

  if(!(await supabase.auth.getUser()).data.user && (pathname.startsWith('/api/module') || pathname.startsWith('/api/user'))){
    return NextResponse.redirect(new URL("/register", request.url));
  }

	if (
		data &&
		data[0].role == "teacher" &&
		pathname.startsWith("/api/module/student")
	) {
		return NextResponse.redirect(new URL("/home", request.url));
	}
	if (
		data &&
		data[0].role == "student" &&
		pathname.startsWith("/api/module/teacher")
	) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	return await updateSession(request);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		"/api/auth/:path*",
		"/api/module/:path*",
		"/api/user/:path*",
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
