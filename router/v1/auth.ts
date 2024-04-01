import type { Router } from 'express'
import userController from '../../controllers/user-controller'
import { asyncErrorHandler } from '../../handlers/error-handler'
import { checkLoginData } from '../../middlewear/mongoose-middleware'

function authRouter(router: Router) {
  router.post('/registration', asyncErrorHandler(userController.registration))
  router.post('/login', checkLoginData, asyncErrorHandler(userController.login))
  router.post('/check', asyncErrorHandler(userController.check))
  router.post('/refresh', asyncErrorHandler(userController.refresh))
}

export default authRouter