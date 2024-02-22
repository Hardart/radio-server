import { ArchiveTrack } from '../models/ArchiveTrack'

export class ArchiveTrackService {
  static async save(id: string) {
    const track = new ArchiveTrack({
      createdAt: new Date(),
      trackId: id,
    })
    await track.save()
  }
}
