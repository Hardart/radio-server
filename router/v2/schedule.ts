import type { Router } from 'express'

import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import { checkId } from '../../middlewear/mongoose-middleware'
import scheduleController from '../../controllers/schedule-controller'
import removeAuthData from '../../middlewear/remove-auth-data'

function scheduleRouter(router: Router) {
  router.post('/schedule', checkId, asyncErrorHandler(scheduleController.findOne))
  router.post('/schedule-list', asyncErrorHandler(scheduleController.list))
  router.post('/schedule-add', asyncErrorHandler(scheduleController.addOne))
  router.post('/schedule-update', authMiddleware, removeAuthData, asyncErrorHandler(scheduleController.updateOne))
  router.post('/schedule-update-many', authMiddleware, removeAuthData, asyncErrorHandler(scheduleController.updateMany))
  router.post('/schedule-delete', authMiddleware, checkId, asyncErrorHandler(scheduleController.deleteOne))
}

export default scheduleRouter
