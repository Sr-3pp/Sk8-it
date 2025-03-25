import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { LineContest, Participant } from '../../index'

export const LineContestScore = sqliteTable('line-contest-scores', {
  lineContestId: integer('line_contest_id').references(() => LineContest.id),
  participantId: integer('participant_id').references(() => Participant.id),
  score_a: real().default(0),
  score_b: real().default(0),
  score_c: real().default(0),
  score_d: real().default(0),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const lineContestScoreRelations = relations(LineContestScore, ({ one }) => ({
  contest: one(LineContest, {
    fields: [LineContestScore.lineContestId],
    references: [LineContest.id],
  }),
  participant: one(Participant, {
    fields: [LineContestScore.participantId],
    references: [Participant.id],
  }),
}))
