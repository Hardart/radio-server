import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import userController from '../controllers/user-controller'
import authMiddleware from '../middlewear/auth-middleware'
const router = Router()

router.get('/news', articleController.list)
router.get('/article', articleController.oneById)

router.post('/article-add', articleController.addOne)
router.post('/article-update', authMiddleware, articleController.updateOne)
router.post('/article-delete', articleController.deleteOne)

router.post('/category-add', categoryController.addOne)
router.post('/category-update', categoryController.updateOne)
router.post('/category-delete', categoryController.deleteOne)

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)
router.get('/refresh', userController.refresh)

export default router
