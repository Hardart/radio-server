import { Parser } from 'icecast-parser'
import { Server } from 'socket.io'
import { MetadataService } from './metadata-service'
import { CacheService } from './cache-service'
import { TrackService } from './track-service'
import { ArchiveTrackService } from './archive-service'
import { Itunes } from './iTunes-service'

const simpleMeta = {
  artistName: 'Радио Штаны',
  trackTitle: '',
  cover: '/images/simple_logo.svg',
}

export class IcecastService {
  io: Server | undefined = undefined
  private url = 'http://localhost:80/rsh_federal'
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
      notifyOnChangeOnly: true,
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
    console.log(streamTitle)
    if (this.trackTitle === streamTitle) return
    if (!streamTitle) return this.io ? this.io.emit('radio:jingle', simpleMeta) : undefined
    this.trackTitle = streamTitle
    const { searchTerm, artistName, trackTitle } = MetadataService.parseTrackName(streamTitle)
    CacheService.saveTrack(artistName, trackTitle)

    await this.saveMetadata(searchTerm)
    if (this.io) this.io.emit('radio:track', CacheService.metaData)
    return
  }

  private onEmpty() {
    console.log('empty meta')
  }

  private async saveMetadata(searchTerm: string) {
    const { artistName, trackTitle } = CacheService.metaData
    try {
      const track = await TrackService.findOne(artistName, trackTitle)
      if (track) {
        ArchiveTrackService.save(track.id)
        CacheService.saveCovers(track.cover || '')
      } else {
        const { cover, preview } = await Itunes.searchOneTrack(searchTerm)
        CacheService.saveCovers(cover)
        const id = await TrackService.save({ artistName, trackTitle, cover, preview })
        ArchiveTrackService.save(id)
      }
    } catch (error) {
      CacheService.saveCovers(simpleMeta.cover)
      const id = await TrackService.save({ artistName, trackTitle, cover: simpleMeta.cover, preview: '' })
      ArchiveTrackService.save(id)
    }
  }
}
