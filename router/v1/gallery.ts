import type { Router } from 'express'

import { asyncErrorHandler } from '../../handlers/error-handler'
import slideController from '../../controllers/slide-controller'
import authMiddleware from '../../middlewear/auth-middleware'

export default function userRouter(router: Router) {
  router.post('/gallery', asyncErrorHandler(slideController.list))
  router.post('/gallery-add', authMiddleware, asyncErrorHandler(slideController.save))
  router.post('/gallery-update', authMiddleware, asyncErrorHandler(slideController.updatePriority))
  router.post('/gallery-delete-single', authMiddleware, asyncErrorHandler(slideController.deleteOne))
}
