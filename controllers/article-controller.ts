import articleService from '../service/article-service'
import type { Response, Request, NextFunction } from 'express'
import type { QueryParams } from '../types/custom-request'
import BaseController from './base-controller'

class ArticleController extends BaseController {
  async all(_: Request, res: Response, next: NextFunction) {
    const articles = await articleService.all()
    res.status(200).json(ArticleController.response({ articles }))
  }

  async oneById(req: Request, res: Response, next: NextFunction) {
    const article = await articleService.findById(req.body.id)
    res.status(200).json(ArticleController.response({ article }))
  }

  async addOne(req: Request, res: Response, next: NextFunction) {
    const article = await articleService.add(req.body)
    res.status(200).json(ArticleController.response({ article }))
  }

  async updateOne(req: Request, res: Response, next: any) {
    const article = await articleService.updateOne(req.body)
    res.status(200).json(ArticleController.response({ article }))
  }

  async deleteOne(req: Request, res: Response, next: any) {
    const article = await articleService.deleteOne(req.body.id)
    res.status(200).json(ArticleController.response({ article }))
  }

  // ============================================================

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.body.queryParams as QueryParams
      const articles = await articleService.list(queryParams)
      const count = await articleService.count(queryParams)
      res.setHeader('X-Total', count)
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const { slug } = req.query as Record<string, string>
    try {
      const articles = await articleService.findBySlug(slug)
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }

  async oneByTag(_: Request, res: Response, next: NextFunction) {
    try {
      const articles = await articleService.findByTag('музыка')
      return res.json(articles)
    } catch (error) {
      next(error)
    }
  }
}

export default new ArticleController()
