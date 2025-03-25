import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Category, Subcategory, Board, Clothe } from './index'

export const Product = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  cost: integer('cost').default(0),
  price: integer('price').notNull(),
  thumbs: text('thumbs'),
  categoryId: integer('category_id').references(() => Category.id),
  subcategoryId: integer('subcategory_id').references(() => Subcategory.id),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const productsRelations = relations(Product, ({ many, one }) => ({
  boards: many(Board),
  clothes: many(Clothe),
  category: one(Category, {
    fields: [Product.categoryId],
    references: [Category.id],
  }),
  subcategory: one(Subcategory, {
    fields: [Product.subcategoryId],
    references: [Subcategory.id],
  }),
}))
