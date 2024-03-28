import { Response, Request, ErrorRequestHandler, NextFunction } from 'express'
import ErrorApi from '../handlers/error-api'

export const ErrorHandler: ErrorRequestHandler = (err: ErrorApi, req: Request, res: Response, next: NextFunction) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json('Сервер не отвечает')
}
