import { NextResponse } from "next/server";
import { queryOne, execute } from "@/lib/db";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
        }

        const user = await queryOne(
            "SELECT * FROM admin_users WHERE email = ? AND is_active = 1",
            [email]
        );

        if (!user || !(await bcrypt.compare(password, (user as any).password_hash))) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        await execute("UPDATE admin_users SET last_login = NOW() WHERE id = ?", [(user as any).id]);

        const token = await new SignJWT({ userId: (user as any).id, email: (user as any).email, role: (user as any).role })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        const response = NextResponse.json({
            success: true,
            user: { email: (user as any).email, name: (user as any).full_name, role: (user as any).role }
        });

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 604800,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}