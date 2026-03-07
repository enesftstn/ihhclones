import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "tr-c367d0.hosting.net.tr",
    user: process.env.MYSQL_USER || "enes",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || "humanitarian_db",
    port: Number(process.env.MYSQL_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    charset: "utf8mb4",
});

// Drizzle ORM instance
export const db = drizzle(pool);

// Helper functions for raw SQL if needed
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const [rows] = await pool.execute(sql, params);
    return rows as T[];
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await query<T>(sql, params);
    return rows[0] || null;
}

export async function execute(sql: string, params: any[] = []) {
    const [result] = await pool.execute(sql, params);
    return result as mysql.ResultSetHeader;
}

export { pool };

export function handleDbError(error: unknown) {
    console.error("[DB] Database error:", error);
    throw new Error("Database operation failed");
}