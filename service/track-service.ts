import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'

export class TrackService {
  static async findOne(artistName: string, trackTitle: string) {
    return await Track.findOne({ artistName, trackTitle })
  }

  static async save(trackData: ITrackMetadata) {
    return await Track.create(trackData)
  }

  async list() {
    return await Track.find().select('-updatedAt -preview').sort({ createdAt: 'desc' })
  }

  async count() {
    return await Track.find().countDocuments()
  }
}

export default new TrackService()
