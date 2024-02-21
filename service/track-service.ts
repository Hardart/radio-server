import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'

export class TrackService {
  static async findOne(artistName: string, trackTitle: string) {
    const track = await Track.findOneAndUpdate({ artistName, trackTitle }, { artistName, trackTitle })
    return track
  }

  static async save(trackData: ITrackMetadata) {
    const track = new Track(trackData)
    const { id } = await track.save()
    return id
  }
}
