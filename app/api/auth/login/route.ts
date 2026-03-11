import { NextResponse } from "next/server";
import { queryOne, execute, query } from "@/lib/db";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

if (!process.env.JWT_SECRET) {
    console.warn("⚠️ KRİTİK UYARI: JWT_SECRET ortam değişkeni tanımlı değil! 'default_secret_key' kullanılıyor.");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ 
                error: "Email and password are required",
                details: { email: !email ? "missing" : "provided", password: !password ? "missing" : "provided" }
            }, { status: 400 });
        }

        // First check if the user exists at all (regardless of is_active status)
        const userExists = await queryOne(
            "SELECT id, email, password_hash, is_active, full_name, role FROM admin_users WHERE email = ?",
            [email]
        );

        if (!userExists) {
            return NextResponse.json({ 
                error: "No account found with this email address",
                details: { reason: "email_not_found" }
            }, { status: 401 });
        }

        // Check if user is active
        if (!(userExists as any).is_active) {
            return NextResponse.json({ 
                error: "Your account has been deactivated. Please contact an administrator.",
                details: { reason: "account_deactivated" }
            }, { status: 401 });
        }

        // Verify password
        const passwordValid = await bcrypt.compare(password, (userExists as any).password_hash);

        if (!passwordValid) {
            return NextResponse.json({ 
                error: "Incorrect password. Please try again.",
                details: { reason: "invalid_password" }
            }, { status: 401 });
        }

        // Update last login timestamp
        await execute("UPDATE admin_users SET last_login = NOW() WHERE id = ?", [(userExists as any).id]);

        // Create JWT token
        const token = await new SignJWT({ 
            userId: (userExists as any).id, 
            email: (userExists as any).email, 
            role: (userExists as any).role 
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            user: { 
                email: (userExists as any).email, 
                name: (userExists as any).full_name, 
                role: (userExists as any).role 
            }
        });

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 604800,
            path: "/",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ 
            error: "A server error occurred during login",
            details: { 
                reason: "server_error",
                message: error?.message || "Unknown error"
            }
        }, { status: 500 });
    }
}
