// proxy.ts -> middleware.ts olarak deðiþtirildi

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

// 'proxy' olan ismi 'middleware' yapýyoruz
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    // 1. Kullanýcý zaten login sayfasýndaysa ve tokený varsa admine yönlendir
    if (pathname === '/admin/login' && token) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (e) {
            // Token geçersizse çerezi temizlemek iyi bir fikir olabilir
        }
    }

    // 2. Admin sayfalarýný koru (Login sayfasý hariç)
    if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            // Token'ý doðrula
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            // Token sahte veya süresi dolmuþsa login'e gönder
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            // Bozuk token'ý temizle ki sonsuz döngüye girmesin
            response.cookies.delete('session');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};