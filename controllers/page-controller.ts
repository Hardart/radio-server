import type { Response, Request } from 'express'
import BaseController from './base-controller'
import pageService from '../service/page-service'

class PageController extends BaseController {
  async list(req: Request, res: Response) {
    const contacts = await pageService.footerContacts()
    res.status(200).json(PageController.response({ contacts }))
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
