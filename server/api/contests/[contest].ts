export default defineEventHandler(async (event) => {
  const { contest: id } = getRouterParams(event);

  const db = useDrizzle()
  const contest = await db.query.Contest.findFirst({
    where: eq(tables.Contest.id, Number(id)),
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
  })


  return {
    data: contest,
  }
})
