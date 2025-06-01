import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { Product, Category } from './index';

export const Retailer = sqliteTable('retailer', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    categoryId: integer('category_id').references(() => Category.id),
    createdAt: text('timestamp')
        .notNull()
        .default(sql`(current_timestamp)`),
    updatedAt: text('timestamp')
        .notNull()
        .default(sql`(current_timestamp)`),
});

export const retailerRelations = relations(Retailer, ({many, one}) => ({
    products: many(Product),
    category: one(Category, {
        fields: [Retailer.categoryId],
        references: [Category.id],
    }),
}))