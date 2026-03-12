

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");


export async function proxy(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;


    if (pathname === '/admin/login' && token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (e) {

        }
    }

    if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {

            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error: any) {
            console.error("JWT DOGRULAMA HATASI:", error.message); // Ýþte aradýðýmýz cevap burada!
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};