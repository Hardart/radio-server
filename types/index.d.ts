export interface ItunesResponse {
  resultCount: number
  results: ItunesSong[]
}
export interface ItunesSong {
  artistName: string
  artworkUrl30: string
  artworkUrl60: string
  artworkUrl100: string
}

export interface ITrackMetadata {
  artistName: string
  trackTitle: string
  covers: ICoverData
}

export interface ICoverData {
  art30: string
  art60: string
  art100: string
  art300: string
  art600: string
}
