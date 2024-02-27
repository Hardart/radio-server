import type { ItunesResponse } from '../types'

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
