import fs from 'fs'
import { Response, NextFunction, Request } from 'express'
import AppError, { isError } from '../handlers/error-handler'
import ErrorService from '../service/error-service'

function deleteFolder(req: Request, res: Response, next: NextFunction) {
  const { path } = req.body
  ErrorService.append(path)
  if (!path) {
    req.body.status = false
    return next()
  }
  const isFolder = !path.match(/\.(jpe?g|png|webp|avif)$/)
  ErrorService.append(isFolder)
  try {
    const dir = `/home${path}`
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
