import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Contest, SkateContestMatch } from '../../index'

export const SkateContest = sqliteTable('skate-contests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contestId: integer('contest_id').references(() => Contest.id),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const skateContestRelations = relations(SkateContest, ({ one, many }) => ({
  contest: one(Contest, {
    fields: [SkateContest.contestId],
    references: [Contest.id],
  }),
  matches: many(SkateContestMatch),
}))
