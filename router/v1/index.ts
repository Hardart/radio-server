import { Router } from 'express'
import userRouter from './user'
import authRouter from './auth'
import articlesRouter from './articles'
import categoryRouter from './categories'
import trackRouter from './tracks'
import fileRouter from './files'
import programRouter from './programs'
import galleryRouter from './gallery'
import baseRouter from './base'
import settingsRouter from './settings'

const router = Router()

userRouter(router)
authRouter(router)
articlesRouter(router)
categoryRouter(router)
trackRouter(router)
fileRouter(router)
programRouter(router)
galleryRouter(router)
baseRouter(router)
settingsRouter(router)

export default router
