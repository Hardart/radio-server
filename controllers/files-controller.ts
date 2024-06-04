import type { Response, Request, NextFunction } from 'express'
import fileService from '../service/file-service'
import BaseController from './base-controller'
import AppError from '../handlers/error-handler'

class FileController extends BaseController {
  async upload(req: Request, res: Response, next: NextFunction) {
    if (!req.file) throw AppError.BadRequest('При загрузке изображения произошла ошибка')
    // const path = req.file.path.replace('/Users/hardart/home', '')
    const path = req.file.path
    res.status(200).json(FileController.response({ path }))
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    res.status(200).json(FileController.response({ file: req.body }))
  }

  async list(req: Request, res: Response, next: NextFunction) {
    const files = fileService.readImages(req.body.src)
    res.status(200).json(FileController.response({ files }))
  }
}

export default new FileController()
