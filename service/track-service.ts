import { Track } from '../models/Track'
import { ITrackMetadata } from '../types'

class TrackService {
  async findOne(artistName: string, trackTitle: string) {
    return await Track.findOne({ artistName, trackTitle })
  }

  async save(trackData: ITrackMetadata) {
    return await Track.create(trackData)
  }

  async list() {
    return await Track.find().select('-updatedAt').sort({ createdAt: 'desc' })
  }

  async update(trackData: ITrackMetadata & { id: string }) {
    return await Track.findByIdAndUpdate(trackData.id, trackData, { new: true })
  }

  async count() {
    return await Track.find().countDocuments()
  }
}

export default new TrackService()
