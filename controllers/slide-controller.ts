import type { Response, Request } from 'express'
import BaseController from './base-controller'
import slideService from '../service/slide-service'

class SlideController extends BaseController {
  async list(req: Request, res: Response) {
    const slides = await slideService.list()
    res.status(200).json(SlideController.response({ slides }))
  }

  async save(req: Request, res: Response) {
    const slide = await slideService.save(req.body)
    res.status(200).json(SlideController.response({ slide }))
  }

  async updatePriority(req: Request, res: Response) {
    const slides = await slideService.updatePriority(req.body)
    res.status(200).json(SlideController.response({ slides }))
  }

  async deleteOne(req: Request, res: Response) {
    const id = await slideService.deleteOne(req.body)
    res.status(200).json(SlideController.response({ id }))
  }
}

export default new SlideController()
