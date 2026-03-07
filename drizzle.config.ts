import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts", // Tablo tanýmlarýnýn bulunacaðý yer
  out: "./drizzle",            // SQL migration dosyalarýnýn oluþturulacaðý klasör
  dialect: "mysql",            // Kullanacaðýmýz veritabaný türü
  dbCredentials: {
    url: process.env.DATABASE_URL!, // .env dosyasýndaki baðlantý adresi
  },
});