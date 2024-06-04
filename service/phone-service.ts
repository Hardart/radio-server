import { Phone } from '../models/Phone'

class PhoneService {
  async list() {
    return await Phone.find()
  }

  async add(phone: Phone) {
    return Phone.create(phone)
  }
}

export default new PhoneService()
