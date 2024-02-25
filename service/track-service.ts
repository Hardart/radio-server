import { ArchiveTrack } from '../models/ArchiveTrack'
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

  async list(limit: number) {
    return await Track.find().limit(limit).sort('updatedAt')
  }

  async history(date: string) {
    const fromTime = new Date(date)
    const toTime = new Date(Date.parse(date) + 3 * 3600 * 1000)
    const tracks = await ArchiveTrack.find({ createdAt: { $gte: fromTime, $lt: toTime } }).populate({
      path: 'trackId',
      select: '-createdAt -updatedAt',
    })
    return tracks
  }
}

export default new TrackService()
