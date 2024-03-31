import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'

export default function userRouter(router: Router) {
  router.post('/user-list', asyncErrorHandler(userController.list))
  router.post('/user-add', authMiddleware, asyncErrorHandler(userController.add))
  router.post('/user-update', authMiddleware, asyncErrorHandler(userController.update))
}
