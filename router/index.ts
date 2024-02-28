import { Router } from 'express'
import articleController from '../controllers/article-controller'
import categoryController from '../controllers/category-controller'
import pageController from '../controllers/page-controller'
import trackController from '../controllers/track-controller'

const router = Router()

// router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.registration)
// router.post('/login', body('email').isEmail(), body('password').isLength({ min: 3, max: 32 }), userController.login)

router.get('/main', pageController.main)
router.get('/app', pageController.meta)
router.get('/team', pageController.hosts)
router.get('/schedule', pageController.schedule)

router.get('/categories', categoryController.getAll)
router.post('/article', articleController.one)
router.post('/tag', articleController.oneByTag)
router.get('/news', articleController.all)
router.get('/menu', articleController.menu)
router.get('/track', trackController.getAll)
router.post('/history', trackController.getByDate)

export default router
