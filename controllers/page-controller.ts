import type { Response, Request } from 'express'
import pageService from '../service/page-service'

class PageController {
  async schedule(_: Request, res: Response, next: any) {
    try {
      const data = await pageService.programs()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async meta(_: Request, res: Response, next: any) {
    try {
      const data = await pageService.nav()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }
  async hosts(_: Request, res: Response, next: any) {
    try {
      const data = await pageService.hosts()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new PageController()
