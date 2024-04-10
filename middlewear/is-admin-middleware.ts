import { Response, NextFunction, Request } from 'express'

import AppError from '../handlers/error-handler'

export default function (req: Request, res: Response, next: NextFunction) {
  const user = req.body.user
  if (!user) throw AppError.UnathorizedError()
  if (!user.roles.includes('hero' || 'admin')) throw AppError.PermissonDenided()
  next()
}
