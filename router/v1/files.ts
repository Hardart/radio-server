import type { Router } from 'express'
import filesController from '../../controllers/files-controller'
import imageUploadMiddlewear from '../../middlewear/upload/image-upload-middlewear'
import { resizeImage } from '../../middlewear/upload/image-resize-middlewear'
import deleteAllImagesById from '../../middlewear/delete-all-middleware'
import deleteOriginalImage from '../../middlewear/delete-original-middleware'
import deleteFolder from '../../middlewear/delete-folder-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'

export default function fileRouter(router: Router) {
  router.post('/files', asyncErrorHandler(filesController.list))
  router.post(
    '/image-avatar',
    imageUploadMiddlewear.single('avatar'),
    resizeImage,
    deleteOriginalImage,
    asyncErrorHandler(filesController.upload)
  )
  router.post(
    '/image-gallery',
    imageUploadMiddlewear.single('gallery'),
    resizeImage,
    deleteOriginalImage,
    asyncErrorHandler(filesController.upload)
  )
  router.post(
    '/image-news',
    imageUploadMiddlewear.single('news'),
    resizeImage,
    deleteOriginalImage,
    asyncErrorHandler(filesController.upload)
  )
  router.post('/image-delete', deleteAllImagesById, asyncErrorHandler(filesController.delete))
  router.post('/folder-delete', deleteFolder, asyncErrorHandler(filesController.delete))
}
