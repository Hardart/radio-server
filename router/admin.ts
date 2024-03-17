import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
const router = Router()

// router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
// router.post('/login', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.login)

router.get('/news', articleController.list)
router.get('/article', articleController.oneById)

router.post('/article-add', articleController.addOne)
router.post('/article-update', articleController.updateOne)

router.post('/category-add', categoryController.addOne)
router.post('/category-update', categoryController.updateOne)
router.post('/category-delete', categoryController.deleteOne)

export default router
