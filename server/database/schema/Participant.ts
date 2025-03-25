import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { ContestParticipants } from './index'

export const Participant = sqliteTable('participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sku: text('sku').notNull(),
  name: text('name').notNull(),
  sponsors: text('sponsors').notNull(),
  stance: text('stance').notNull(),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const participantRelations = relations(Participant, ({ many }) => ({
  contests: many(ContestParticipants),
}))
