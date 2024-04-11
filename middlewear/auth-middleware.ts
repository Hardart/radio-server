import { Response, NextFunction, Request } from 'express'
import tokenService from '../service/token-service'
import AppError from '../handlers/error-handler'

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) throw AppError.UnathorizedError()

  const accessToken = authHeader.split(' ')[1]
  if (!accessToken) throw AppError.UnathorizedError()

  const userData = tokenService.validateAccessToken(accessToken)
  if (!userData) throw AppError.UnathorizedError()

  const { id, email, fullName, roles, firstName, lastName } = userData
  req.body.user = { id, email, fullName, roles, firstName, lastName }
  next()
}
