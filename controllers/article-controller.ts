import articleService from '../service/article-service'
import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'

class ArticleController {
  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.body.queryParams as QueryParams
      const articles = await articleService.all(queryParams)
      const count = await articleService.count(queryParams)
      res.setHeader('X-Total', count)
      return res.json(articles)
    } catch (error) {
      next(error)
      return
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.query as Record<string, string>
    try {
      const articles = await articleService.findBySlug(slug)
      return res.json(articles)
    } catch (error) {
      next(error)
      return
    }
  }

  async oneByTag(_: Request, res: Response, next: NextFunction) {
    try {
      const articles = await articleService.findByTag('музыка')
      return res.json(articles)
    } catch (error) {
      next(error)
      return
    }
  }

  async addOne(req: Request, res: Response, next: NextFunction) {
    try {
      const articleData = req.body
      const article = await articleService.add(articleData)
      return res.json(article)
    } catch (error) {
      next(error)
      return
    }
  }
}

export default new ArticleController()
