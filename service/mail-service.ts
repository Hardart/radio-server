import { Mail } from '../models/Mail'

class MailService {
  async list() {
    return await Mail.find()
  }

  async add(mail: Mail) {
    return Mail.create(mail)
  }
}

export default new MailService()
