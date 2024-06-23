import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import contactController from '../../controllers/contact-controller'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function settingsRouter(router: Router) {
  router.post('/contacts', asyncErrorHandler(contactController.list))
  router.put('/settings/footer', asyncErrorHandler(contactController.updateFooterContacts))
  router.post('/settings/footer', asyncErrorHandler(contactController.footerContacts))
  router.put('/settings/contacts', asyncErrorHandler(contactController.updateBaseContacts))
  router.post('/settings/contacts', asyncErrorHandler(contactController.baseContacts))
  router.post('/settings/phone', asyncErrorHandler(contactController.addPhone))
  router.post('/settings/mail', asyncErrorHandler(contactController.addMail))
  router.post('/settings/address', asyncErrorHandler(contactController.addAddress))
  // router.post('/phones-update', authMiddleware, asyncErrorHandler(slideController.updatePriority))
}
