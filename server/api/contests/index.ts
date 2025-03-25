export default defineEventHandler(async () => {
  const drizzle = useDrizzle()

  const contests = await drizzle.query.Contest.findMany({
    with: {
      participants: {
        with: {
          participant: true,
        },
      },
      skateContest: {
        with: {
          matches: true,
        },
      },
      lineContest: {
        with: {
          scores: true,
        },
      },
      bestTrickContest: {
        with: {
          scores: true,
        },
      },
    },
    // limit: Number(limit),
    // offset: (Number(page) - 1) * Number(limit),
  })
  return {
    data: contests,
  }
})
