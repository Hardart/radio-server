import type { Response, Request } from 'express'
import trackService from '../service/track-service'

class TrackController {
  async getAll(req: Request, res: Response) {
    const { limit } = req.query
    const tracks = await trackService.list(Number(limit))
    return res.json(tracks)
  }

  async getByDate(req: Request, res: Response) {
    const { date } = req.body
    const tracks = await trackService.history(String(date))
    return res.json(tracks)
  }
}

export default new TrackController()
