import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { Participant, Contest } from '../index'

export const ContestParticipants = sqliteTable('contest-participants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  contestId: integer('contestId').notNull().references(() => Contest.id),
  participantId: integer('participantId').notNull().references(() => Participant.id),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const contestParticipantsRelations = relations(ContestParticipants, ({ one }) => ({
  participant: one(Participant, {
    fields: [ContestParticipants.participantId],
    references: [Participant.id],
  }),
  contest: one(Contest, {
    fields: [ContestParticipants.contestId],
    references: [Contest.id],
  }),
}))
