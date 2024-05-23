import { Contact, ContactWithID } from '../models/Contact'
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

class PageService {
  async hosts() {
    return team
  }

  async footerContacts() {
    return await Contact.find().select('-createdAt -updatedAt')
  }

  async updateFooterContacts(contacts: ContactWithID[]) {
    contacts.forEach(async (contact) => await Contact.findByIdAndUpdate(contact.id, contact))
    return true
  }

  async addContacts(contact: Contact) {
    return await Contact.create(contact)
  }

  async index(query: QueryParams) {
    const pageData = {
      news: await articleService.list(query),
      hosts: await this.hosts()
    }
    return pageData
  }
}

export default new PageService()
