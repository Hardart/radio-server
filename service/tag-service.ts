import { Tag } from '../models/Tag'

class TagService {
  async list() {
    const tags = await Tag.find().select('title')
    return tags.map((tag) => tag.title)
  }

  async addOrUpdate(tags: string[]) {
    tags.forEach(async (tag) => await Tag.updateOne({ title: tag }, { title: tag }, { upsert: true }))
  }
}

export default new TagService()
