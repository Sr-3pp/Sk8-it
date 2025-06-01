import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { User } from './';

export const Blog = sqliteTable('blog_posts', {
    id: text('id').primaryKey(),
    banner: text('banner').notNull(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    authorId: integer('author_id').references(() => User.id),
    tags: text('tags', { mode: 'json' }).default('[]'),
    content: text('content', { mode: 'json' }).notNull(), 
    createdAt: text('timestamp')
        .notNull()
        .default(sql`(current_timestamp)`),
    updatedAt: text('timestamp')
        .notNull()
        .default(sql`(current_timestamp)`),
});

export const blogRelations = relations(Blog, ({one}) => ({
    user: one(User, {
        fields: [Blog.authorId],
        references: [User.id]
    })
}))