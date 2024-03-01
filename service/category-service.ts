import { Category } from '../models/Category'

class CategoryService {
  async getAll() {
    return await Category.find().select('title slug createdAt isPublished')
  }

  async add(data: Category) {
    const cat = new Category(data)
    return await cat.save()
  }
}

export default new CategoryService()
