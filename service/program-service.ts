import { Program } from '../models/Program'

class ProgramService {
  async list() {
    return await Program.find()
  }
}

export default new ProgramService()
