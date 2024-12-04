import { Response, NextFunction, Request } from 'express'
import AppError from '../handlers/error-handler'

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) throw AppError.UnathorizedError()

  const accessToken = authHeader.split(' ')[1]
  if (!accessToken) throw AppError.UnathorizedError()

  next()
}
