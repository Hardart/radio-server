import { Router } from 'express'

import programRouter from './programs'
import scheduleRouter from './schedule'
import fileRouter from './files'

const router = Router()

fileRouter(router)
programRouter(router)
scheduleRouter(router)

export default router
