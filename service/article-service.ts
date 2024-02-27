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
      .select(['content', 'slug', 'title', 'createdAt', 'url', 'preview', 'isPublished'])
      .sort({ createdAt: 'desc' })
      .populate('categoryId', ['title', 'slug'])
    return articles
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
