import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import { asyncErrorHandler } from '../../handlers/error-handler'

function authRouter(router: Router) {
  router.post('/auth/registration', asyncErrorHandler(userController.registration))
  router.post('/auth/login', asyncErrorHandler(userController.login))
  router.get('/auth/check', asyncErrorHandler(userController.check))
  router.get('/auth/refresh', asyncErrorHandler(userController.refresh))
}

export default authRouter
