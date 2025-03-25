import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Contest, BestTrickContestScore } from '../../index'

export const BestTrickContest = sqliteTable('best-trick-contests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contestId: integer('contest_id').references(() => Contest.id),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const bestTrickContestRelations = relations(BestTrickContest, ({ one, many }) => ({
  contest: one(Contest, {
    fields: [BestTrickContest.contestId],
    references: [Contest.id],
  }),
  scores: many(BestTrickContestScore),
}))
