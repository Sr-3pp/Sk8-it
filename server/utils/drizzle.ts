import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from '../database/schema/index'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

const { public: config } = useRuntimeConfig()

interface TursoConfig {
  databaseUrl: string
  authToken: string
}

export function useDrizzle() {

  const turso = createClient({
    url: (config.turso as TursoConfig).databaseUrl,
    authToken: (config.turso as TursoConfig).authToken,
  });

  return  drizzle(turso, { schema });
}

export type Board = typeof schema.Board.$inferSelect
export type Category = typeof schema.Category.$inferSelect
export type Clothe = typeof schema.Clothe.$inferSelect
export type Outlet = typeof schema.Outlet.$inferSelect
export type Product = typeof schema.Product.$inferSelect
export type Sale = typeof schema.Sale.$inferSelect
export type Shipping = typeof schema.Shipping.$inferSelect
export type Subcategory = typeof schema.Subcategory.$inferSelect
export type User = typeof schema.User.$inferSelect
