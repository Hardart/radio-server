import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import pageController from '../../controllers/page-controller'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function baseRouter(router: Router) {
  router.post('/base', asyncErrorHandler(pageController.baseData))
}
