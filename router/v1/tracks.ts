import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import trackController from '../../controllers/track-controller'
import authMiddleware from '../../middlewear/auth-middleware'
import { checkId } from '../../middlewear/mongoose-middleware'

export default function trackRouter(router: Router) {
  router.post('/track-list', asyncErrorHandler(trackController.list))
  router.post('/track-update', authMiddleware, checkId, asyncErrorHandler(trackController.update))
}
