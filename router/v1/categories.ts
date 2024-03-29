import type { Router } from 'express'
import categoryController from '../../controllers/category-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'

function categoryRouter(router: Router) {
  router.post('/category-list', asyncErrorHandler(categoryController.list))
  router.post('/category-add', authMiddleware, asyncErrorHandler(categoryController.addOne))
  router.post('/category-update', authMiddleware, asyncErrorHandler(categoryController.updateOne))
  router.post('/category-delete', authMiddleware, asyncErrorHandler(categoryController.deleteOne))
}

export default categoryRouter
