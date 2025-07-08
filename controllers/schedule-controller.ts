import type { Response, Request } from 'express'
import BaseController from './base-controller'
import scheduleService from '../service/schedule-service'

class ScheduleController extends BaseController {
  async list(req: Request, res: Response) {
    const scheduleList = await scheduleService.list()
    res.status(200).json(ScheduleController.response({ scheduleList }))
  }

  async addOne(req: Request, res: Response) {
    const schedule = await scheduleService.add(req.body)
    res.status(200).json(ScheduleController.response({ schedule }))
  }

  async deleteOne(req: Request, res: Response) {
    const schedule = await scheduleService.deleteOne(req.body.id)
    res.status(200).json(ScheduleController.response({ schedule }))
  }

  async findOne(req: Request, res: Response) {
    const schedule = await scheduleService.findById(req.body.id)
    res.status(200).json(schedule)
  }

  async updateOne(req: Request, res: Response, next: any) {
    const schedule = await scheduleService.updateOne(req.body)
    res.status(200).json(ScheduleController.response({ schedule }))
  }

  async updateMany(req: Request, res: Response, next: any) {
    const result = await scheduleService.updateMany(req.body)
    res.status(200).json(ScheduleController.response({ result }))
  }
}

export default new ScheduleController()
