import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'
import slideController from '../../controllers/slide-controller'

export default function userRouter(router: Router) {
  router.post('/gallery', asyncErrorHandler(slideController.list))
  router.post('/gallery-add', asyncErrorHandler(slideController.save))
}
