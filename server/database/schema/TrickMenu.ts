import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const TrickMenu = sqliteTable('trick-menu', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  spot: text('spot').notNull(),
  description: text('description').notNull(),
  difficulty: integer('difficulty').notNull(),
  price: integer('price').notNull(),
  status: text('status').notNull().default('active'),
  skater: text('skater'),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})
