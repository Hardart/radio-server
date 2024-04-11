import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function userRouter(router: Router) {
  router.post('/user-list', asyncErrorHandler(userController.list))
  router.post('/user-add', authMiddleware, asyncErrorHandler(userController.add))
  router.post('/user-update', authMiddleware, isAdminMiddleware, asyncErrorHandler(userController.update))
  router.post('/user-delete', authMiddleware, isAdminMiddleware, asyncErrorHandler(userController.deleteOne))
  router.post('/user-hosts', asyncErrorHandler(userController.getHosts))
}
