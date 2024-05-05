import type { Router } from 'express'

import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import programController from '../../controllers/program-controller'
import { checkId } from '../../middlewear/mongoose-middleware'

function programRouter(router: Router) {
  router.post('/program-list', asyncErrorHandler(programController.list))
  router.post('/program-add', authMiddleware, asyncErrorHandler(programController.addOne))
  router.post('/program-delete', authMiddleware, checkId, asyncErrorHandler(programController.deleteOne))
  router.get('/program', asyncErrorHandler(programController.one)) // ????? only POST
}

export default programRouter
