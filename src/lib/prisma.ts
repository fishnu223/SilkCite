import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { serverEnv } from "@/lib/env";

/**
 * Prisma Client singleton.
 *
 * Prisma 7 uses a driver adapter (pg) rather than an engine-managed connection
 * pool. The connection string is read from the server environment only and is
 * never exposed to the browser. When no database is configured the client is
 * `null` and the lead API returns a safe "unavailable" response instead of
 * crashing.
 */

const globalForPrisma = globalThis as unknown as {
  __silkcitePrisma?: PrismaClient;
};

function createClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: serverEnv.databaseUrl,
    max: serverEnv.poolMax,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 20_000,
  });

  return new PrismaClient({
    adapter,
    // Keep logging quiet in production; never log query parameters.
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export function getPrisma(): PrismaClient | null {
  if (!serverEnv.databaseUrl) return null;

  if (!globalForPrisma.__silkcitePrisma) {
    globalForPrisma.__silkcitePrisma = createClient();
  }
  return globalForPrisma.__silkcitePrisma;
}
