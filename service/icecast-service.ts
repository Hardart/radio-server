import { Parser } from 'icecast-parser'
import { Server } from 'socket.io'
import { Itunes, MetadataService } from './metadata-service'
import { CacheService } from './cache-service'

const simpleMeta = {
  artistName: 'Радио Штаны',
  trackTitle: '',
  covers: {
    art30: '/images/simple_logo.svg',
    art60: '/images/simple_logo.svg',
    art100: '/images/simple_logo.svg',
    art300: '/images/simple_logo.svg',
    art600: '/images/simple_logo.svg',
  },
}

export class IcecastService {
  io: Server | undefined = undefined
  private url = 'https://stream.lolamedia.ru/rsh_federal'
  private emptyInterval = 4
  private errorInterval = 5
  private metadataInterval = 5
  private trackTitle: string = ''

  initRadioStream() {
    const radioStation = new Parser({
      url: this.url,
      emptyInterval: this.emptyInterval,
      errorInterval: this.errorInterval,
      metadataInterval: this.metadataInterval,
    })
    radioStation.on('metadata', this.onMetadata.bind(this))
    radioStation.on('error', console.log)
    radioStation.on('empty', this.onEmpty)
  }

  initSocket(io: Server) {
    this.io = io
  }

  private async onMetadata(metadata: Map<string, string>) {
    const streamTitle = metadata.get('StreamTitle')
    if (this.trackTitle === streamTitle) return
    if (!streamTitle) return this.io ? this.io.emit('radio:jingle', simpleMeta) : undefined
    this.trackTitle = streamTitle
    const { searchTerm, artistTitle, trackTitile } = MetadataService.parseTrackName(streamTitle)

    CacheService.saveTrack(artistTitle, trackTitile)
    try {
      const response = await Itunes.searchOneTrack(searchTerm)
      CacheService.saveCovers(response)
    } catch (error) {
      CacheService.saveCovers(simpleMeta.covers)
    }

    if (this.io) this.io.emit('radio:track', CacheService.metaData)
    return
  }

  private onEmpty() {
    console.log('empty meta')
  }
}
