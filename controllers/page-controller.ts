import type { Response, Request } from 'express'
import BaseController from './base-controller'
import contactService from '../service/contact-service'

class PageController extends BaseController {
  async baseData(req: Request, res: Response) {
    const phones = await contactService.phonesList()
    const emails = await contactService.mailsList()
    const addresses = await contactService.addressesList()
    res.status(200).json(PageController.response({ phones, emails, addresses }))
  }
}

export default new PageController()
