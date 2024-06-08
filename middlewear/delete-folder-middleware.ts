import fs from 'fs'
import { Response, NextFunction, Request } from 'express'
import AppError, { isError } from '../handlers/error-handler'
import ErrorService from '../service/error-service'

function deleteFolder(req: Request, res: Response, next: NextFunction) {
  const { path } = req.body

  if (!path) {
    req.body.status = false
    return next()
  }
  const isFolder = !path.match(/\.(jpe?g|png|webp|avif)$/)

  try {
    const rootImagesDir = process.env.MODE === 'dev' ? './assets/images/home' : '/home'
    const dir = `${rootImagesDir}${path}`
    if (isFolder) {
      fs.rmdirSync(dir)
      req.body.status = true
    } else {
      req.body.status = false
    }
  } catch (error) {
    ErrorService.append(error)
    if (isError(error)) throw AppError.custom(error.errno)
  }

  next()
}

export default deleteFolder
