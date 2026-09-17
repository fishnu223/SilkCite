// Prisma 7 configuration.
//
// Prisma 7 no longer reads the connection string from `schema.prisma` and no
// longer auto-loads `.env`. This file wires the CLI (migrate / generate /
// studio) to `DATABASE_URL`. At runtime the application uses the driver
// adapter in `src/lib/prisma.ts` instead — this file is only for the CLI.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
