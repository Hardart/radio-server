import { Tag } from '../models/Tag'

class TagService {
  async all() {
    return (await Tag.find().select('title')).map(tag => tag.title)
  }
}

export default new TagService()
