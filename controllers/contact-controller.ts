import type { Response, Request } from 'express'
import BaseController from './base-controller'
import contactService from '../service/contact-service'

class ContactController extends BaseController {
  async list(req: Request, res: Response) {
    const phones = await contactService.phonesList()
    const emails = await contactService.mailsList()
    res.status(200).json(ContactController.response({ phones, emails }))
  }

  async footerContacts(req: Request, res: Response) {
    const contact = await contactService.footerContacts()
    res.status(200).json(ContactController.response({ contact }))
  }

  async baseContacts(req: Request, res: Response) {
    const contact = await contactService.baseContacts()
    res.status(200).json(ContactController.response({ contact }))
  }

  async updateFooterContacts(req: Request, res: Response) {
    await contactService.updateFooterContacts(req.body)
    res.status(200).json(ContactController.response())
  }

  async updateBaseContacts(req: Request, res: Response) {
    await contactService.updateBaseContacts(req.body)
    res.status(200).json(ContactController.response())
  }

  async addPhone(req: Request, res: Response) {
    const phone = await contactService.addPhone(req.body)
    res.status(200).json(ContactController.response({ phone }))
  }

  async addMail(req: Request, res: Response) {
    const email = await contactService.addMail(req.body)
    res.status(200).json(ContactController.response({ email }))
  }

  async addAddress(req: Request, res: Response) {
    const address = await contactService.addAddress(req.body)
    res.status(200).json(ContactController.response({ address }))
  }
}

export default new ContactController()
