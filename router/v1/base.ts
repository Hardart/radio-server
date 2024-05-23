import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import pageController from '../../controllers/page-controller'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function baseRouter(router: Router) {
  router.post('/base', asyncErrorHandler(pageController.list))
  router.post('/base/footer-add', asyncErrorHandler(pageController.add))
  router.post('/base/footer-update', asyncErrorHandler(pageController.updateFooterContacts))
}
