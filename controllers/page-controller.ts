import type { Response, Request } from 'express'
import BaseController from './base-controller'
import pageService from '../service/page-service'
import phoneService from '../service/phone-service'
import mailService from '../service/mail-service'

class PageController extends BaseController {
  async footerData(req: Request, res: Response) {
    const contacts = await pageService.footerContacts()
    res.status(200).json(PageController.response({ contacts }))
  }

  async baseData(req: Request, res: Response) {
    const phones = await phoneService.list()
    const emails = await mailService.list()
    res.status(200).json(PageController.response({ phones, emails }))
  }

  async add(req: Request, res: Response) {
    const contact = await pageService.addContacts(req.body)
    res.status(200).json(PageController.response({ contact }))
  }

  async updateFooterContacts(req: Request, res: Response) {
    await pageService.updateFooterContacts(req.body)
    res.status(200).json(PageController.response())
  }
}

export default new PageController()
