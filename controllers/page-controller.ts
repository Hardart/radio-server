import pageService from '../service/page-service'
import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'
import articleService from '../service/article-service'
import tagService from '../service/tag-service'

class PageController {
  async schedule(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await pageService.programs()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async meta(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await pageService.nav()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async hosts(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await pageService.hosts()
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async main(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.filterParams as QueryParams
      const data = await pageService.index(query)
      return res.json(data)
    } catch (error) {
      next(error)
      return
    }
  }

  async news(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.filterParams as QueryParams
      const news = await articleService.all(query)
      const tags = await tagService.all()
      return res.json({ news, tags })
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new PageController()
