import type { Router } from 'express'

// import authMiddleware from '../../middlewear/auth-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import programController from '../../controllers/program-controller'

function programRouter(router: Router) {
  router.post('/program-list', asyncErrorHandler(programController.list))
  router.post('/program-add', asyncErrorHandler(programController.addOne))
  router.get('/program', asyncErrorHandler(programController.one)) // ????? only POST
}

export default programRouter
