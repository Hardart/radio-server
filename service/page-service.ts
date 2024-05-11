import { QueryParams } from '../types/custom-request'
import articleService from './article-service'

const team = [
  {
    name: 'Ella Ward',
    position: 'Dental Assistant',
    image: '/images/team/01.webp'
  },

  {
    name: 'Cedric Wilson',
    position: 'Dental Assistant',
    image: '/images/team/02.webp'
  },

  {
    name: 'Sandra Kim',
    position: 'Dental Assistant',
    image: '/images/team/03.webp'
  },

  {
    name: 'Edie Sheffield',
    position: 'Dental Assistant',
    image: '/images/team/04.webp'
  },

  {
    name: 'Miriam Weber',
    position: 'Office Management',
    image: '/images/team/05.webp'
  },

  {
    name: 'Amber Rosso',
    position: 'Office Management',
    image: '/images/team/06.webp'
  },

  {
    name: 'Alison Hart',
    position: 'Front Desk',
    image: '/images/team/07.webp'
  },

  {
    name: 'Shelley Wyatt',
    position: 'Front Desk',
    image: '/images/team/08.webp'
  }
]

const mainMenu = [
  {
    slug: '',
    label: 'Радио',
    childrens: [
      { slug: 'schedule', label: 'Сетка вещания' },
      { slug: 'playlist', label: 'Плейлист' },
      { slug: 'hosts', label: 'Ведущие' },
      { slug: 'podcasts', label: 'Подкасты' },
      { slug: 'live', label: 'Прямой эфир' },
      { slug: 'news', label: 'Новости' }
    ]
  },
  {
    slug: 'programs',
    label: 'Программы',
    childrens: [
      { slug: 'top-chart', label: 'TOP Chart 20' },
      { slug: '', label: 'Итоги недели' }
    ]
  },
  {
    slug: 'promo',
    label: 'Конкурсы',
    childrens: [
      { slug: 'how-get-prize', label: 'Как получить приз' },
      { slug: 'model-regulations', label: 'Правила участия в играх' }
    ]
  },
  {
    slug: 'contacts',
    label: 'Контакты',
    childrens: [
      { slug: 'about', label: 'О радиостанции' },
      { slug: 'team', label: 'Команда' }
    ]
  }
]

class PageService {
  async hosts() {
    return team
  }

  async nav() {
    return addLinkToMenuItem(mainMenu)
  }

  async index(query: QueryParams) {
    const pageData = {
      news: await articleService.list(query),
      hosts: await this.hosts()
    }
    return pageData
  }
}

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

export default new PageService()
