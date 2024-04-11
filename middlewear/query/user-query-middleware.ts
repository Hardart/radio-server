import { Response, NextFunction, Request } from 'express'

export function decodeUserQuery(req: Request, _: Response, next: NextFunction) {
  const query = req.query
  console.log(query)
  next()
}
