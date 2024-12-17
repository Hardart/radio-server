import type { Router } from 'express'

import { asyncErrorHandler } from '../../handlers/error-handler'
import contactController from '../../controllers/contact-controller'
import { checkId } from '../../middlewear/mongoose-middleware'
import authMiddleware from '../../middlewear/auth-middleware'

export default function settingsRouter(router: Router) {
  router.post('/contacts', asyncErrorHandler(contactController.list))
  router.put('/settings/footer', asyncErrorHandler(contactController.updateFooterContacts))
  router.post('/settings/footer', asyncErrorHandler(contactController.footerContacts))
  router.put('/settings/contacts', asyncErrorHandler(contactController.updateBaseContacts))
  router.post('/settings/contacts', asyncErrorHandler(contactController.baseContacts))
  router.post('/settings/phone', asyncErrorHandler(contactController.addPhone))
  router.post('/settings/mail', asyncErrorHandler(contactController.addMail))
  router.post('/settings/address', asyncErrorHandler(contactController.addAddress))
  router.post('/settings/phone/delete', authMiddleware, checkId, asyncErrorHandler(contactController.deletePhone))
  router.post('/settings/mail/delete', authMiddleware, checkId, asyncErrorHandler(contactController.deleteMail))
  router.post('/settings/address/delete', authMiddleware, checkId, asyncErrorHandler(contactController.deleteAddress))
}
