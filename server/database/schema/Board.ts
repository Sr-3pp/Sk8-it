import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core'
import { Product } from './index'

export const Board = sqliteTable('boards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => Product.id),
  description: text('description'),
  size: numeric('size'),
  shape: text('shape'),
  stock: integer('stock').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const boardRelations = relations(Board, ({ one }) => ({
  product: one(Product, {
    fields: [Board.productId],
    references: [Product.id],
  }),
}))
