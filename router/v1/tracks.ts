import type { Router } from 'express'
import { asyncErrorHandler } from '../../handlers/error-handler'
import trackController from '../../controllers/track-controller'

export default function trackRouter(router: Router) {
  router.post('/track-list', asyncErrorHandler(trackController.list))
  router.post('/track-save', asyncErrorHandler(trackController.save))
}
