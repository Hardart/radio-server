import type { Router } from 'express'
import articleController from '../../controllers/article-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import { checkId } from '../../middlewear/mongoose-middleware'
import pageController from '../../controllers/page-controller'

function articlesRouter(router: Router) {
  router.post('/article-base', asyncErrorHandler(pageController.newsData))
  router.post('/article', checkId, asyncErrorHandler(articleController.oneById))
  router.post('/article-list', asyncErrorHandler(articleController.all))
  router.post('/article-add', authMiddleware, asyncErrorHandler(articleController.addOne))
  router.post('/article-update', authMiddleware, checkId, asyncErrorHandler(articleController.updateOne))
  router.post('/article-delete', authMiddleware, checkId, asyncErrorHandler(articleController.deleteOne))
}

export default articlesRouter
