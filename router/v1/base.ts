import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import pageController from '../../controllers/page-controller'
import contactController from '../../controllers/contact-controller'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function baseRouter(router: Router) {
  router.post('/base', asyncErrorHandler(pageController.baseData))
  router.post('/base/phone-add', asyncErrorHandler(contactController.addPhone))
  router.post('/base/email-add', asyncErrorHandler(contactController.addMail))
  router.post('/base-footer', asyncErrorHandler(pageController.footerData))
  router.post('/base/footer-add', asyncErrorHandler(pageController.add))
  router.post('/base/footer-update', asyncErrorHandler(pageController.updateFooterContacts))
}
