import type { ICoverData } from '../types'

export class CacheService {
  private static trackMeta = {
    artistName: '',
    trackTitle: '',
    covers: {},
  }

  static get metaData() {
    return this.trackMeta
  }

  static saveTrack(artistName: string, trackTitle: string) {
    this.trackMeta.artistName = artistName
    this.trackMeta.trackTitle = trackTitle
  }
  static saveCovers(covers: ICoverData) {
    this.trackMeta.covers = covers
  }
}
