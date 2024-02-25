import articleService from '../service/article-service'
import type { Response, Request } from 'express'

class ArticleController {
  async all(_: Request, res: Response) {
    const articles = await articleService.all()
    return res.json(articles)
  }

  async one(req: Request, res: Response, next: any) {
    const { slug } = req.body as Record<string, string>
    try {
      const articles = await articleService.findBySlug(slug)
      return res.json(articles)
    } catch (error) {
      next(error)
      return
    }
  }
  async oneByTag(req: Request, res: Response, next: any) {
    console.log(req.body)
    try {
      const articles = await articleService.findByTag('музыка')
      return res.json(articles)
    } catch (error) {
      next(error)
      return
    }
  }

  async menu(_: Request, res: Response) {
    const menu = await articleService.getMenu()
    return res.json(menu)
  }
}

export default new ArticleController()
