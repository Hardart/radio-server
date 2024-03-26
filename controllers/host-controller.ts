import { asyncErrorHandler } from '../handlers/error-handler'
import type { Response, Request, NextFunction } from 'express'
import hostService from '../service/host-service'
class HostController {
  list() {
    return asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
      const hosts = await hostService.list()
      res.status(200).json(hosts)
    })
  }
  add() {
    return asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
      const host = req.body
      const response = await hostService.add(host)
      console.log(response)
      res.status(200).json('ok')
    })
  }
  updateOne() {
    return asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
      const host = req.body
      const response = await hostService.updateOne(host)
      res.status(200).json(response)
    })
  }
}

export default new HostController()
