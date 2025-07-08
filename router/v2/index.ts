import { Router } from 'express'

import programRouter from './programs'
import scheduleRouter from './schedule'

const router = Router()

programRouter(router)
scheduleRouter(router)

export default router
