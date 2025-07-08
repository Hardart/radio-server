import mongoose, { mongo } from 'mongoose'
import { RadioProgram } from '../models/RadioProgram'
import { BaseService } from './_base-service'
import { Schedule } from '../models/Schedule'
import scheduleService from './schedule-service'
// import scheduleService from './schedule-service'

type RadioData = Omit<RadioProgram, 'schedule'> & { schedule: [Schedule] }

class ProgramService extends BaseService {
  async list() {
    return await RadioProgram.find().populate({ path: 'schedule' })
  }

  async add(data: RadioData) {
    const schedule = await scheduleService.add(data.schedule[0])
    const program: RadioProgram = { ...data, schedule: [schedule.id] }
    const createdProgram = (await RadioProgram.create(program)).populate('schedule')
    return createdProgram
  }

  async one() {
    const id = new mongoose.Types.ObjectId('6607cdd4e1ba38b553279e6c')
    return await RadioProgram.aggregate([
      {
        $match: { _id: id }
      }
    ])
  }

  async updateOne(data: Partial<RadioProgram> & { id: string }) {
    return await RadioProgram.findByIdAndUpdate(data.id, data, { new: true }).populate('schedule')
  }

  async addSchedule({ programId, scheduleId }: { programId: string; scheduleId: string }) {
    return await RadioProgram.findByIdAndUpdate(programId, { $push: { schedule: scheduleId } }, { new: true }).populate(
      'schedule'
    )
  }

  async deleteSchedule({ programId, scheduleId }: { programId: string; scheduleId: string }) {
    async function removeScheduleFromProgram() {
      const program = await RadioProgram.findByIdAndUpdate(
        programId,
        { $pull: { schedule: scheduleId } },
        { new: true }
      ).populate('schedule')
      if (!program) throw new Error('Program not found')
      await scheduleService.deleteOne(scheduleId)
      return program
    }

    return await this.withTransaction<RadioProgram>(removeScheduleFromProgram)
  }

  async deleteWithTransaction(programId: string) {
    async function deleteOne(session: mongo.ClientSession) {
      const program = await RadioProgram.findByIdAndDelete(programId)
      if (!program) throw new Error('Program not found')

      const ids = program.schedule.map((scheduleItem) => scheduleItem._id)
      await scheduleService.deleteMany(ids, session)
      return program._id
    }

    return await this.withTransaction<mongoose.Types.ObjectId>(deleteOne)
  }
}

export default new ProgramService()
