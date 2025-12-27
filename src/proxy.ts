import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/auth";

// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export const config = {
//     matcher: "/:path*",   // match everything for testing
//     runtime: "edge",      // <<< REQUIRED for Next.js 16
// };

export function middleware(request: NextRequest) {
    // throw new Error("🔥 middleware test error");
    console.log("🔥 MIDDLEWARE FIRED:", request.url);

    return NextResponse.next();
}







// This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//     console.log("🔥 PROXY FIRED:", request.url);
//     return NextResponse.redirect(new URL('/home', request.url))

// }

export async function proxy(request: NextRequest) {
    // console.log("🔥 PROXY FIRED:", request.url);
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })
    // // THIS IS NOT SECURE!
    // // This is the recommended approach to optimistically redirect users
    // // We recommend handling auth checks in each page/route
    // if (!session) {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }
    console.log("🔥 proxy FIRED:", request.url);
    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard",
    ]
    // " /about/:path*"],
};