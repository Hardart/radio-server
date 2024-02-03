export {}

declare global {
  interface ItunesSong {
    artistName: string
    artworkUrl60: string
    artworkUrl100: string
  }

  interface ItunesResponse {
    resultCount: number
    results: ItunesSong[]
  }
}
