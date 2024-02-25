import scheduleService from '../service/schedule-service'
import type { Response, Request } from 'express'

class PageController {
  async schedule(_: Request, res: Response, next: any) {
    try {
      const data = await scheduleService.programs()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new PageController()
