import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import { decodeQuery } from '../middlewear/query-admin-middlwear'
const router = Router()

// router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
// router.post('/login', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.login)

router.post('/article-add', articleController.addOne)
router.post('/category-add', categoryController.addOne)
router.get('/news', decodeQuery, articleController.list)

export default router
