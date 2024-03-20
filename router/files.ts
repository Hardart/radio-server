import { Router } from 'express'
import filesController from '../controllers/files-controller'
import imageUploadMiddlewear from '../middlewear/upload/image-upload-middlewear'
import { resizeImage } from '../middlewear/upload/image-resize-middlewear'
import deleteAllImagesById from '../middlewear/delete-all-middleware'
import deleteOriginalImage from '../middlewear/delete-original-middleware'

const router = Router()
router.post('/image', imageUploadMiddlewear.single('avatar'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image/gallery', imageUploadMiddlewear.single('gallery'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image/news', imageUploadMiddlewear.single('news'), resizeImage, deleteOriginalImage, filesController.uploadTest)
router.post('/image/delete', deleteAllImagesById, filesController.deleteTest)
export default router
