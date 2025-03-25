import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { BestTrickContest, Participant } from '../../index'

export const BestTrickContestScore = sqliteTable('best-trick-contest-scores', {
  bestTrickContestId: integer('best_trick_contest_id').references(() => BestTrickContest.id),
  participantId: integer('participant_id').references(() => Participant.id),
  tricks: text('tricks'),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const bestTrickContestScoreRelations = relations(BestTrickContestScore, ({ one }) => ({
  contest: one(BestTrickContest, {
    fields: [BestTrickContestScore.bestTrickContestId],
    references: [BestTrickContest.id],
  }),
  participant: one(Participant, {
    fields: [BestTrickContestScore.participantId],
    references: [Participant.id],
  }),
}))
