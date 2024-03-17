import { Router } from 'express'
import filesController from '../controllers/files-controller'
import imageUploadMiddlewear from '../middlewear/upload/image-upload-middlewear'
import { resizeImage } from '../middlewear/upload/image-resize-middlewear'

const router = Router()
router.post('/image', imageUploadMiddlewear.single('avatar'), resizeImage, filesController.uploadTest)
router.post('/image/gallery', imageUploadMiddlewear.single('gallery'), resizeImage, filesController.uploadTest)
router.post('/image/news', imageUploadMiddlewear.single('news'), resizeImage, filesController.uploadTest)
export default router
