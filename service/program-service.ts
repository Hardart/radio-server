import mongoose from 'mongoose'
import { Program } from '../models/Program'

class ProgramService {
  async list() {
    return await Program.find()
  }

  async one() {
    const id = new mongoose.Types.ObjectId('6607cdd4e1ba38b553279e6c')
    return await Program.aggregate([
      {
        $match: { _id: id }
      }
    ])
  }
}

export default new ProgramService()
