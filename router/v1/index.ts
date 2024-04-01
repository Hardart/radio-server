import { Router } from 'express'
import userRouter from './user'
import authRouter from './auth'
import articlesRouter from './articles'
import categoryRouter from './categories'
import trackRouter from './tracks'
import fileRouter from './files'
import programRouter from './programs'
const router = Router()

userRouter(router)
authRouter(router)
articlesRouter(router)
categoryRouter(router)
trackRouter(router)
fileRouter(router)
programRouter(router)

export default router