import AppError from '../handlers/error-handler'
import { Article, ArticleWithID } from '../models/Article'
import { Category } from '../models/Category'
import { Tag } from '../models/Tag'
import type { QueryParams } from '../types/custom-request'
import tagService from './tag-service'

class ArticleService {
  async all() {
    const articles = await Article.find()
      .select('title slug tags createdAt isPublished publishAt')
      .populate({ path: 'categoryId', select: 'title slug' })
    return articles
  }

  async list({ filter, sort, limit, page }: QueryParams) {
    const cats = await Category.find({ isPublished: true })

    const articles = await Article.find({ $and: [...filter, { categoryId: { $in: cats } }] })
      .select('title slug image createdAt')
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

  async findById(id: string) {
    const article = await Article.findById(id).populate('categoryId')
    if (!article) throw AppError.NoItemById('Article', id)
    return article
  }

  async findByTag(tagTitle: string) {
    return await Tag.findOne({ title: tagTitle }).populate('articles')
  }

  async add(data: Article) {
    if (data.tags && data.tags.length) tagService.addOrUpdate(data.tags)
    data.content = cleanArticleContent(data.content)
    const createdArticle = await Article.create(data)
    return createdArticle.populate('categoryId')
  }

  async updateOne(data: ArticleWithID) {
    if (data.tags && data.tags.length) tagService.addOrUpdate(data.tags)
    data.content = cleanArticleContent(data.content)
    return await Article.findByIdAndUpdate(data.id, data, { new: true }).populate('categoryId')
  }

  async deleteOne(id: string) {
    return await Article.findByIdAndDelete(id)
  }
}

export default new ArticleService()

function cleanArticleContent(content: string) {
  return content.replace(/http:\/\/localhost:3068/gm, '')
}
