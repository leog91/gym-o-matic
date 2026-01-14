import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest) {

    console.log("🔥 MIDDLEWARE FIRED:", request.url);

    return NextResponse.next();
}




export async function proxy(request: NextRequest) {

    console.log("🔥 proxy FIRED:", request.url);
    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard",
    ]

};