interface Contest {
  name: string,
  address: string,
  latlng: string,
  date: string,
  prizes: string[],
  podium: string[],
  sponsors: Sponsor[],
}

declare module '~/types/contest' {
  export type Contest = Contest
}
