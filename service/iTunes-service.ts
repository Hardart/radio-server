import type { ItunesResponse, ItunesTrackMeta } from '../types'

export class Itunes {
  private static term: string = ''

  static async searchOneTrack(searchTerm: string): Promise<ItunesTrackMeta | null> {
    this.term = searchTerm
    const data = await this.fetchTrack()
    if (!data) return null
    if (data.resultCount == 0) return null
    const { artworkUrl60, previewUrl } = data.results[0]
    return { cover: artworkUrl60, preview: previewUrl }
  }

  private static async fetchTrack(): Promise<ItunesResponse> {
    console.log('search: ' + this.searchParams)
    const response = await fetch(`https://itunes.apple.com/search?${this.searchParams}`)
    const meta = await response.json()
    return meta
  }

  private static get searchParams() {
    return new URLSearchParams({ term: this.term, limit: '1', entity: 'song', media: 'music' })
  }
}
