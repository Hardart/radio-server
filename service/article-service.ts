import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
import type { QueryParams } from '../types/custom-request'

class ArticleService {
  async all({ filter, sort, limit, page }: QueryParams) {
    const articles = await Article.find({ $and: filter })
      .select('title slug preview createdAt')
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
    console.log(articles)
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
    const tags = data.tags.map(tag => ({ title: tag }))
    await Tag.updateMany(tags, tags, { upsert: true })
    const article = new Article(data)
    return await article.save()
  }

  async addKey() {
    await Article.updateMany({}, { publishAt: new Date() })
  }
}

export default new ArticleService()
