import { Category } from '../models/Category'

class CategoryService {
  async getAll() {
    return await Category.find().select('title slug createdAt updatedAt isPublished')
  }

  async add(data: Category) {
    return await Category.create(data)
  }

  async updateOne(data: Category) {
    return await Category.findOneAndUpdate({ slug: data.slug }, data, { new: true })
  }

  async deleteOne(id: string) {
    return await Category.findByIdAndDelete(id)
  }
}

export default new CategoryService()
