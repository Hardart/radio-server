import type { Response, Request } from 'express'
import trackService from '../service/track-service'
import BaseController from './base-controller'

class TrackController extends BaseController {
  async list(req: Request, res: Response) {
    const tracks = await trackService.list()
    res.status(200).json(TrackController.response({ tracks }))
  }
}

export default new TrackController()
