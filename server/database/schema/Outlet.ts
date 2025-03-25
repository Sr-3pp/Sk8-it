import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const Outlet = sqliteTable('outlets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  manager: text('manager').notNull(),
  address: text('address').notNull(),
  phone: text('phone'),
  facebook: text('facebook'),
  instagram: text('instagram'),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})
