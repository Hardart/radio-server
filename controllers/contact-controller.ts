import type { Response, Request } from 'express'
import BaseController from './base-controller'
import phoneService from '../service/phone-service'
import mailService from '../service/mail-service'

class ContactController extends BaseController {
  async list(req: Request, res: Response) {
    const phones = await phoneService.list()
    const emails = await mailService.list()
    res.status(200).json(ContactController.response({ phones, emails }))
  }

  async addPhone(req: Request, res: Response) {
    const phone = await phoneService.add(req.body)
    res.status(200).json(ContactController.response({ phone }))
  }

  async addMail(req: Request, res: Response) {
    const email = await mailService.add(req.body)
    res.status(200).json(ContactController.response({ email }))
  }
}

export default new ContactController()
