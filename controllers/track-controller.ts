import type { Response, Request } from 'express'
import trackService from '../service/track-service'
import BaseController from './base-controller'
import { Itunes } from '../service/iTunes-service'
import { ITrackMetadata } from '../types'
import { trackArchiveService } from '../service/track-archive-service'

class TrackController extends BaseController {
  async list(req: Request, res: Response) {
    const tracks = await trackService.list()
    res.status(200).json(TrackController.response({ tracks }))
  }

  async save(req: Request, res: Response) {
    const trackData = req.body.trackData as string
    const [artistName, trackTitle] = trackData.split(' - ')
    const track = await trackService.findOne(artistName, trackTitle)
    if (track) {
      trackArchiveService.save(track.id)
      res.status(200).json(track)
    } else {
      const iTunesResponse = await Itunes.searchOneTrack(trackData)
      if (!iTunesResponse) {
        res.status(200).json(null)
      } else {
        const trackData: ITrackMetadata = { ...iTunesResponse, artistName, trackTitle }
        const createdTrack = await trackService.save(trackData)
        console.log('save')
        trackArchiveService.save(createdTrack.id)
        res.status(200).json(createdTrack)
      }
    }
  }
}

export default new TrackController()
