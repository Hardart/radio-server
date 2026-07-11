import { Router } from 'express'

import programRouter from './programs'
import scheduleRouter from './schedule'
import fileRouter from './files'
import settingsRouter from './settings'

const router = Router()

fileRouter(router)
programRouter(router)
scheduleRouter(router)
settingsRouter(router)

export default router
