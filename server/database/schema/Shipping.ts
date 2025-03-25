import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const Shipping = sqliteTable('shippings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  address: text('address').notNull(),
  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),
  status: integer('status').notNull().default(0),
  cost: integer('total').notNull().default(0),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})
