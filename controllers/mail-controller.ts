import type { Response, Request } from 'express'
import BaseController from './base-controller'
import mailService from '../service/mail-service'

class MailController extends BaseController {
  async list(req: Request, res: Response) {
    const emails = await mailService.list()
    res.status(200).json(MailController.response({ emails }))
  }

  async add(req: Request, res: Response) {
    const email = await mailService.add(req.body)
    res.status(200).json(MailController.response({ email }))
  }
}

export default new MailController()
