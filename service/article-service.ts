import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
import type { ArticleQuery } from '../types/article'
const menu = [
  {
    slug: '',
    label: 'Радио',
    childrens: [
      { slug: 'schedule', label: 'Сетка вещания' },
      { slug: 'hosts', label: 'Ведущие' },
      { slug: 'podcasts', label: 'Подкасты' },
      { slug: 'live', label: 'Прямой эфир' },
      { slug: 'news', label: 'Новости' },
    ],
  },
  {
    slug: 'programs',
    label: 'Программы',
    childrens: [
      { slug: 'top-chart', label: 'TOP Chart 20' },
      { slug: '', label: 'Итоги недели' },
      // { slug: '', label: 'Лучшие треки недели' },
    ],
  },
  {
    slug: 'promo',
    label: 'Конкурсы',
    childrens: [
      { slug: 'how-get-prize', label: 'Как получить приз' },
      { slug: 'model-regulations', label: 'Правила участия в играх' },
    ],
  },
  {
    slug: 'contacts',
    label: 'Контакты',
    childrens: [
      { slug: 'about', label: 'О радиостанции' },
      { slug: 'team', label: 'Команда' },
    ],
  },
]
const BASE_QUERY = {
  limit: 12,
}
class ArticleService {
  async all({ limit, page, tag }: ArticleQuery) {
    const articles = await Article.find(tag ? { tags: tag } : {})
      .select('title slug content isPublished preview createdAt tags -_id')
      .sort({ createdAt: 'desc' })
      .populate({ path: 'categoryId', select: 'title slug' })
      .skip(page ? (Number(page) - 1) * Number(limit) : 0)
      .limit(Number(limit) || BASE_QUERY.limit)
    return articles
  }

  async count() {
    return await Article.countDocuments()
  }

  async findBySlug(slug: string) {
    return await Article.findOne({ slug }).populate('categoryId')
  }

  async getMenu() {
    return addLinkToMenuItem(menu)
  }

  async findByTag(tagTitle: string) {
    return await Tag.findOne({ title: tagTitle }).populate('articles')
  }

  async add(data: Article) {
    // console.log(data)
    const article = new Article(data)
    return await article.save()
  }
}

export default new ArticleService()

function addLinkToMenuItem(menuItems: any) {
  return menuItems.map(mapMenuItem())
}

function mapMenuItem(parentLink: string = '') {
  return function (item: any) {
    item.link = `${parentLink}/${item.slug}`.replace('//', '/')
    item.childrens = item.childrens?.map(mapMenuItem(item.link))
    return item
  }
}
