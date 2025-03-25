import { sql, relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { SkateContest, LineContest, BestTrickContest, ContestParticipants } from '../index'

export const Contest = sqliteTable('contests', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  banner: text('banner').default('/img/default.jpg'),
  date: text('date').notNull(),
  cost: integer('cost').notNull(),
  prizes: text('prizes').notNull(),
  podium: text('podium'),
  description: text('description').notNull(),
  address: text('address').notNull(),
  latlng: text('latlng').notNull(),
  sponsors: text('sponsors').notNull(),
  status: integer('status', { mode: 'boolean' }).notNull(),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const contestRelations = relations(Contest, ({ many, one }) => ({
  participants: many(ContestParticipants),
  skateContest: one(SkateContest, {
    fields: [Contest.id],
    references: [SkateContest.contestId],
  }),
  lineContest: one(LineContest, {
    fields: [Contest.id],
    references: [LineContest.contestId],
  }),
  bestTrickContest: one(BestTrickContest, {
    fields: [Contest.id],
    references: [BestTrickContest.contestId],
  }),
}))
