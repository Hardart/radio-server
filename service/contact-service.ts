import { Address } from '../models/Address'
import { Contact } from '../models/Contact'
import { Mail } from '../models/Mail'
import { Phone } from '../models/Phone'

class ContactService {
  async phonesList() {
    return await Phone.find()
  }

  async mailsList() {
    return await Mail.find()
  }

  async addressesList() {
    return await Address.find()
  }

  async addPhone(phone: Phone) {
    return Phone.create(phone)
  }

  async addMail(email: Mail) {
    return Mail.create(email)
  }

  async addAddress(address: Address) {
    return Address.create(address)
  }

  async footerContacts() {
    return await Contact.findOne({ section: 'footer' }).select('-section, -phones._id -emails._id')
  }

  async baseContacts() {
    return await Contact.findOne({ section: 'contacts' }).select('-section, -phones._id -emails._id')
  }

  async addContacts(contact: Contact) {
    return await Contact.create(contact)
  }

  async updateFooterContacts(contact: Contact) {
    const { phones, emails, addresses } = contact
    await Contact.findOneAndUpdate({ section: 'footer' }, { phones, emails, addresses }, { upsert: true, new: true })
    return true
  }

  async updateBaseContacts(contact: Contact) {
    const { phones, emails, addresses } = contact
    await Contact.findOneAndUpdate({ section: 'contacts' }, { phones, emails, addresses }, { upsert: true, new: true })
    return true
  }
}

export default new ContactService()
