import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    // マイグレーション用は直接接続を使用（poolerではなくポート5432）
    url: env("DIRECT_URL") || env("DATABASE_URL"),
  },
});