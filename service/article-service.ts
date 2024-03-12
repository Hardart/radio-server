import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
import type { QueryParams } from '../types/custom-request'

class ArticleService {
  async list({ filter, sort, limit, page }: QueryParams) {
    const articles = await Article.find({ $and: filter })
      .select('title slug tags content preview createdAt isPublished publishAt')
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
    return articles
  }

  async all({ filter, sort, limit, page }: QueryParams) {
    const articles = await Article.find({ $and: filter })
      .select('title slug preview createdAt')
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
    return articles
  }

  async count({ filter }: QueryParams) {
    return await Article.find({ $and: filter }).countDocuments()
  }
  async countAll() {
    return await Article.countDocuments()
  }

  async findBySlug(slug: string) {
    return await Article.findOne({ slug }).populate('categoryId')
  }

  async findByTag(tagTitle: string) {
    return await Tag.findOne({ title: tagTitle }).populate('articles')
  }

  async add(data: Article) {
    data.tags.forEach(tag => Tag.updateOne({ title: tag }, { title: tag }, { upsert: true }))
    return await Article.updateOne({ slug: data.slug }, data, { upsert: true })
  }
}

export default new ArticleService()
