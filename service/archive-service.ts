import { ArchiveTrack } from '../models/ArchiveTrack'

export class ArchiveTrackService {
  static async save(id: string) {
    const track = new ArchiveTrack({
      createdAt: new Date(),
      trackId: id,
    })
    await track.save()
  }

  async findNewest() {
    const track = await ArchiveTrack.findOne().select('createdAt')
    return track?.createdAt.toISOString() || ''
  }
}

export const archiveTrackService = new ArchiveTrackService()
