import type { Response, Request } from 'express'
import BaseController from './base-controller'
import contactService from '../service/contact-service'
import tagService from '../service/tag-service'
import categoryService from '../service/category-service'

class PageController extends BaseController {
  async baseData(req: Request, res: Response) {
    const phones = await contactService.phonesList()
    const emails = await contactService.mailsList()
    const addresses = await contactService.addressesList()
    res.status(200).json(PageController.response({ phones, emails, addresses }))
  }

  async newsData(req: Request, res: Response) {
    const tags = await tagService.list()
    const categories = await categoryService.getAll()
    res.status(200).json(PageController.response({ tags, categories }))
  }
}

export default new PageController()
