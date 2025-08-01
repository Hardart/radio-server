import type { Router } from 'express'
import filesController from '../../controllers/files-controller'
import { resizeImage } from '../../middlewear/upload/image-resize-middlewear'
import deleteAllImagesById from '../../middlewear/delete-all-middleware'
import deleteOriginalImage from '../../middlewear/delete-original-middleware'
import deleteFolder from '../../middlewear/delete-folder-middleware'
import { asyncErrorHandler } from '../../handlers/error-handler'
import authMiddleware from '../../middlewear/auth-middleware'
import imageUploadByPathMiddlewear from '../../middlewear/upload/image-upload-by-path-middlewear'

export default function fileRouter(router: Router) {
  router.post('/files', authMiddleware, asyncErrorHandler(filesController.list))
  router.post(
    '/image',
    authMiddleware,
    imageUploadByPathMiddlewear.any(),
    resizeImage,
    deleteOriginalImage,
    asyncErrorHandler(filesController.upload)
  )

  router.post('/image-delete', authMiddleware, deleteAllImagesById, asyncErrorHandler(filesController.delete))
  router.post('/folder-delete', authMiddleware, deleteFolder, asyncErrorHandler(filesController.delete))
}
