interface Skater {
  slug: string,
  name: string,
  age: number,
  stance: string,
  sponsors: string[],
  country: string,
  image: string,
  social: {
    instagram: string,
    twitter: string,
    facebook: string
  }
}

declare module '~/types/skater' {
  export type Skater = Skater
}
