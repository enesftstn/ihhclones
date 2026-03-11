// test-db.mjs
import mysql from 'mysql2/promise';
import 'dotenv/config';

async function test() {
  console.log("Baðlantý deneniyor: ", process.env.DATABASE_URL);
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("BAÞARILI: Veritabanýna baðlandýn!");
    await connection.end();
  } catch (err) {
    console.error("BAÞARISIZ: Baðlantý kurulamadý!");
    console.error("Sebep:", err.message);
  }
}
test();