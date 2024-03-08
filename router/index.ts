import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import pageController from '../controllers/page-controller'
import trackController from '../controllers/track-controller'
import { decodeQuery } from '../middlewear/query-middlwear'

const router = Router()

// router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
// router.post('/login', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.login)

router.get('/meta', pageController.meta)
router.get('/main', decodeQuery, pageController.main)
router.get('/app', pageController.meta)
router.get('/team', pageController.hosts)
router.get('/schedule', pageController.schedule)

router.get('/categories', categoryController.getAll)
router.get('/article', articleController.one)
router.post('/tag', articleController.oneByTag)
router.get('/news', decodeQuery, articleController.all)
router.get('/track', trackController.getAll)
router.post('/history', trackController.getByDate)
router.get('/test', decodeQuery)

export default router
