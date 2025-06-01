import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { Outlet, Shipping } from './index'

export const Sale = sqliteTable('sales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  outletId: integer('outlet_id').references(() => Outlet.id),
  sellerId: text('seller_id'),
  shippingId: integer('shipping_id').references(() => Shipping.id),
  total: real('total').notNull(),
  products: text('products', { mode: "json" }).notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const salesRelations = relations(Sale, ({ one }) => ({
  shipping: one(Shipping, {
    fields: [Sale.shippingId],
    references: [Shipping.id],
  }),
  outlet: one(Outlet, {
    fields: [Sale.outletId],
    references: [Outlet.id],
  })
}))
