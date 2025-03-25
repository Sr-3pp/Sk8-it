import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { SkateContest, Participant } from '../../index'

export const SkateContestMatch = sqliteTable('skate-contest-matches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  skateContestId: integer('skateContest_id').references(() => SkateContest.id),
  aParticipantId: integer('a_participant_id').references(() => Participant.id),
  bParticipantId: integer('b_participant_id').references(() => Participant.id),
  aParticipantTricks: text('a_participant_tricks').notNull(),
  bParticipantTricks: text('b_participant_tricks').notNull(),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const skateContestMatchRelations = relations(SkateContestMatch, ({ one }) => ({
  contest: one(SkateContest, {
    fields: [SkateContestMatch.skateContestId],
    references: [SkateContest.id],
  }),
  aParticipant: one(Participant, {
    fields: [SkateContestMatch.aParticipantId],
    references: [Participant.id],
  }),
  bParticipant: one(Participant, {
    fields: [SkateContestMatch.bParticipantId],
    references: [Participant.id],
  }),
}))
