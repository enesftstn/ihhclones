import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode("cok_gizli_ve_uzun_bir_key_123");

export async function middleware(request: NextRequest) { 
    const token = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    if (pathname === '/admin/login' && token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (e) {
        }
    }

    if (pathname.startsWith('/admin') && !pathname.includes('/login') || pathname.startsWith('/api/campaigns')) {
        if (!token) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error: any) {
            console.error("JWT DOGRULAMA HATASI:", error.message);

            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
            }

            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/campaigns/:path*', '/api/campaigns'],
};