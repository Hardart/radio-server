import type { ICoverData, ItunesResponse, ItunesSong } from '../types'
type ArtSize = 30 | 60 | 100 | 300 | 600

export class MetadataService {
  static setCoversSize({ artworkUrl30, artworkUrl60, artworkUrl100 }: ItunesSong): ICoverData {
    const art600 = this.changeArtSize(artworkUrl100, 600)
    const art300 = this.changeArtSize(artworkUrl100, 300)
    return { art30: artworkUrl30, art60: artworkUrl60, art100: artworkUrl100, art300, art600 }
  }

  private static changeArtSize(art100Url: string, size: ArtSize) {
    return art100Url.replace('100x100', `${size}x${size}`)
  }

  static parseTrackName(title: string) {
    const [artistName, trackTitle] = title.split(' - ')
    return { artistName, trackTitle, searchTerm: [artistName, trackTitle].join(' ') }
  }
}

export class Itunes {
  private static term: string = ''

  static async searchOneTrack(searchTerm: string) {
    this.term = searchTerm
    const data = await this.fetchTrack()
    const { artworkUrl60, previewUrl } = data.results[0]
    return { cover: artworkUrl60, preview: previewUrl }
  }

  private static async fetchTrack() {
    const response = await fetch(`https://itunes.apple.com/search?${this.searchParams}`)
    return (await response.json()) as ItunesResponse
  }

  private static get searchParams() {
    return new URLSearchParams({ term: this.term, limit: '1', entity: 'song', media: 'music' })
  }
}
