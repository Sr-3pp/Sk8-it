interface Sponsor {
  name: string,
  logo: string,
  link: string
}

declare module '~/types/sponsor' {
  export type Sponsor = Sponsor
}
