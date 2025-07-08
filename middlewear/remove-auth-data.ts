import { Response, NextFunction, Request } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.body.user) delete req.body.user
  next()
}
