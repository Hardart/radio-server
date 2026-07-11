import type { Router } from 'express'

import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import settingsController from '../../controllers/settings-controller'
// import removeAuthData from '../../middlewear/remove-auth-data'

function settingsRouter(router: Router) {
  router.post('/settings', asyncErrorHandler(settingsController.list))
  router.post('/settings-status', authMiddleware, asyncErrorHandler(settingsController.changeSiteStatus))
  router.post('/settings-update', asyncErrorHandler(settingsController.updateSettings))
}

export default settingsRouter
