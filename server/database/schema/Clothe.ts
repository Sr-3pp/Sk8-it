import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core'
import { Product } from './index'

export const Clothe = sqliteTable('clothes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').references(() => Product.id),
  description: text('description'),
  size: numeric('size'),
  color: text('color'),
  stock: integer('stock'),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const clotheRelations = relations(Clothe, ({ one }) => ({
  product: one(Product, {
    fields: [Clothe.productId],
    references: [Product.id],
  }),
}))
