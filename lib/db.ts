import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const db = drizzle(pool);
export { pool };

export async function query(sql: string, params: any[] = []) {
    const [rows] = await pool.execute(sql, params);
    return rows as any[];
}

export async function queryOne(sql: string, params: any[] = []) {
    const rows = await query(sql, params);
    return rows[0] || null;
}

export async function execute(sql: string, params: any[] = []) {
    const [result] = await pool.execute(sql, params);
    return result;
}