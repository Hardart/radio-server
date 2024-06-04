import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import contactController from '../../controllers/contact-controller'
// import isAdminMiddleware from '../../middlewear/is-admin-middleware'

export default function contactsRouter(router: Router) {
  router.post('/contacts', asyncErrorHandler(contactController.list))
  router.post('/contacts/add-phone', asyncErrorHandler(contactController.addPhone))
  router.post('/contacts/add-mail', asyncErrorHandler(contactController.addMail))
  // router.post('/phones-update', authMiddleware, asyncErrorHandler(slideController.updatePriority))
}
