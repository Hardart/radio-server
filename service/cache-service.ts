import { ICoverData } from '../types'

export class CacheService {
  private static covers: ICoverData | null = null
  private static streamTitle: string

  static addCovers(covers: ICoverData) {
    this.covers = covers
  }

  static addStreamTitle(streamTitle: string) {
    this.streamTitle = streamTitle
  }

  static isCached(streamTitle: string) {
    return this.covers !== null || this.streamTitle === streamTitle
  }
}
