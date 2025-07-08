// import mongoose from 'mongoose'
import mongoose from 'mongoose'
import { Schedule } from '../models/Schedule'

class ScheduleService {
  async list() {
    return await Schedule.find()
  }

  async add(data: Schedule) {
    return await Schedule.create(data)
  }

  async findById(scheduleId: string) {
    // const id = new mongoose.Types.ObjectId(scheduleId)
    return await Schedule.findById(scheduleId)
  }

  async updateOne(data: Schedule & { id: string }) {
    return await Schedule.findByIdAndUpdate(data.id, data, { new: true })
  }

  async updateMany(data: Schedule & { id: string }[]) {
    const updatePromises = data.map((scheduleItem) => {
      return Schedule.findByIdAndUpdate(scheduleItem.id, scheduleItem)
    })
    await Promise.all(updatePromises)
    return { result: true }
  }

  async deleteOne(id: string) {
    return await Schedule.findByIdAndDelete(id)
  }

  async deleteMany(scheduleIds: mongoose.Types.ObjectId[], session: mongoose.mongo.ClientSession | null = null) {
    // Удаление расписаний по списку ID
    return await Schedule.deleteMany({ _id: { $in: scheduleIds } }).session(session)
  }
}

export default new ScheduleService()
