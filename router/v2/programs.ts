import type { Router } from 'express'

import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import RadioProgramController from '../../controllers/radio-program-controller'
import { checkId } from '../../middlewear/mongoose-middleware'

function programRouter(router: Router) {
  router.post('/program-list', asyncErrorHandler(RadioProgramController.list))
  router.post('/program-add', asyncErrorHandler(RadioProgramController.addOne))
  router.post('/program-update', asyncErrorHandler(RadioProgramController.updateOne))
  router.post('/program-add-schedule', asyncErrorHandler(RadioProgramController.addSchedule))
  router.post('/program-delete-schedule', asyncErrorHandler(RadioProgramController.deleteSchedule))
  router.post('/program-delete', authMiddleware, checkId, asyncErrorHandler(RadioProgramController.deleteOne))
  router.post('/program', asyncErrorHandler(RadioProgramController.one))
}

export default programRouter
