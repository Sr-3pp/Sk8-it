import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Outlet, Shipping } from './index'

export const Sale = sqliteTable('sales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  outletId: integer('outlet_id').references(() => Outlet.id),
  shippingId: integer('shipping_id').references(() => Shipping.id),
  total: text('total').notNull(),
  products: text('products').notNull(),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const salesRelations = relations(Sale, ({ one }) => ({
  shipping: one(Shipping, {
    fields: [Sale.shippingId],
    references: [Shipping.id],
  }),
}))
