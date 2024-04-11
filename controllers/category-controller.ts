import type { Response, Request } from 'express'
import BaseController from './base-controller'
import categoryService from '../service/category-service'

class CategoryController extends BaseController {
  async list(req: Request, res: Response) {
    const categories = await categoryService.getAll()
    res.status(200).json(CategoryController.response({ categories }))
  }

  async addOne(req: Request, res: Response) {
    const catData = req.body
    const category = await categoryService.add(catData)
    res.status(200).json(CategoryController.response({ category }))
  }

  async updateOne(req: Request, res: Response) {
    const catData = req.body
    const category = await categoryService.updateOne(catData)
    res.status(200).json(CategoryController.response({ category }))
  }

  async deleteOne(req: Request, res: Response) {
    const { id } = req.body
    const category = await categoryService.deleteOne(id)
    res.status(200).json(CategoryController.response({ category }))
  }
}

export default new CategoryController()
