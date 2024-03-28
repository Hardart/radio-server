import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'

export default function userRouter(router: Router) {
  router.post('/user-add', asyncErrorHandler(userController.add))
  router.get('/user-list', asyncErrorHandler(userController.list))
  router.post('/user-update', authMiddleware, asyncErrorHandler(userController.update))
}
