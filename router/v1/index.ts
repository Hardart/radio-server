import { Router } from 'express'
import userRouter from './user'
import authRouter from './auth'
import articlesRouter from './articles'
const router = Router()

userRouter(router)
authRouter(router)
articlesRouter(router)

export default router
