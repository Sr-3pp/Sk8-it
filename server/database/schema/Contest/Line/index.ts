import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { Contest, Participant, LineContestScore } from '../../index'

export const LineContest = sqliteTable('line-contests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contestId: integer('contest_id').references(() => Contest.id),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const lineContestRelations = relations(LineContest, ({ one, many }) => ({
  contest: one(Contest, {
    fields: [LineContest.contestId],
    references: [Contest.id],
  }),
  scores: many(LineContestScore),
}))
