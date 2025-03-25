const contestFields = [
  'name',
  'date',
  'cost',
  'prizes',
  'description',
  'address',
  'latlng',
  'sponsors',
]

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event)
  const contestData: any = {}
  let banner;

  (data as []).forEach((el: { name: string, filename: string, data: Buffer, type: string }) => {
    if (el.filename) {
      banner = {
        filename: el.filename,
        data: el.data,
        type: el.type,
        name: new Date().getTime() + '-' + el.filename,
      }
    }else{
      contestData[el.name] = el.data.toString()
    }
  })

  contestData.status = false

  const { put } = useHubBlob();

  const bannerBlob = await put(banner!.name, banner!.data, {
    addRandomSuffix: false,
    prefix: 'img/contests',
  })
  contestData.banner = bannerBlob.pathname

  const contest = await useDrizzle().insert(tables.Contest).values(contestData).returning().get()

  for (let i = 0; i < contestData.modes.length; i++) {
    const element = contestData.modes[i]
    const mode = {
      contestId: contest.id,
    }

    if (element == 'skate') {
      const skateContest = await useDrizzle().insert(tables.SkateContest).values(mode).returning().get()
    } else if (element == 'best-trick') {
      const bestTrickContest = await useDrizzle().insert(tables.BestTrickContest).values(mode).returning().get()
    } else if (element == 'line') {
      const lineContest = await useDrizzle().insert(tables.LineContest).values(mode).returning().get()
    }
  }

  return contest
})
