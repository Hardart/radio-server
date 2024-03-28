import type { Router } from 'express'
import articleController from '../../controllers/article-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'

function articlesRouter(router: Router) {
  router.get('/dashboard/articles', asyncErrorHandler(articleController.all))
  router.get('/dashboard/article-id', asyncErrorHandler(articleController.oneById))

  router.post('/article-add', authMiddleware, articleController.addOne)
  router.post('/article-update', authMiddleware, articleController.updateOne)
  router.post('/article-delete', authMiddleware, articleController.deleteOne)
}

export default articlesRouter
