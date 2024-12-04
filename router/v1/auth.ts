import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import { asyncErrorHandler } from '../../handlers/error-handler'
import { checkLoginData } from '../../middlewear/mongoose-middleware'
import authMiddleware from '../../middlewear/auth-middleware'
import isAccessTokenMiddleware from '../../middlewear/is-access-token-middleware'

function authRouter(router: Router) {
  router.post('/registration', authMiddleware, asyncErrorHandler(userController.registration))
  router.post('/login', checkLoginData, asyncErrorHandler(userController.login))
  router.post('/check', authMiddleware, asyncErrorHandler(userController.check))
  router.post('/refresh', isAccessTokenMiddleware, asyncErrorHandler(userController.refresh))
  router.post('/logout', authMiddleware, asyncErrorHandler(userController.logout))
}

export default authRouter
