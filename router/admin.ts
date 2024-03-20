import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
const router = Router()

router.get('/news', articleController.list)
router.get('/article', articleController.oneById)

router.post('/article-add', articleController.addOne)
router.post('/article-update', articleController.updateOne)
router.post('/article-delete', articleController.deleteOne)

router.post('/category-add', categoryController.addOne)
router.post('/category-update', categoryController.updateOne)
router.post('/category-delete', categoryController.deleteOne)

export default router
