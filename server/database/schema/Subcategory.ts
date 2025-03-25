import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Category, Product } from './index'

export const Subcategory = sqliteTable('subcategories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').references(() => Category.id),
  name: text('name').notNull(),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const subcategoryRelations = relations(Subcategory, ({ one, many }) => ({
  category: one(Category, {
    fields: [Subcategory.categoryId],
    references: [Category.id],
  }),
  products: many(Product),
}))
