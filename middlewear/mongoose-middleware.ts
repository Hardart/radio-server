import { Response, NextFunction, Request } from 'express'
import mongoose from 'mongoose'
import AppError from '../handlers/error-handler'

export function checkId(req: Request, _: Response, next: NextFunction) {
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) throw AppError.custom('id')
  next()
}

export function checkLoginData(req: Request, res: Response, next: NextFunction) {
  if (!('email' in req.body) || !('password' in req.body)) throw AppError.BadRequest('Поля email и password обязательны для авторизации')
  next()
}
