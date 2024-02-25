import { Article } from '../models/Article'
import { Tag } from '../models/Tag'
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
class ArticleService {
  async all() {
    const articles = await Article.find()
      .select(['text', 'slug', 'title', 'createdAt', 'url', 'preview'])
      .sort({ createdAt: 'desc' })
      .populate('category', ['title', 'slug'])
    return articles
  }

  async findBySlug(slug: string) {
    return await Article.findOne({ slug }).populate('category')
  }

  async getMenu() {
    return addLinkToMenuItem(menu)
  }

  async findByTag(tagTitle: string) {
    return await Tag.findOne({ title: tagTitle }).populate('articles')
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
