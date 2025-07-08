import type { Response, Request } from 'express'

import BaseController from './base-controller'
import userService from '../service/user-service'
import radioProgramService from '../service/radio-program-service'

class RadioProgramController extends BaseController {
  async list(req: Request, res: Response) {
    const programs = await radioProgramService.list()
    const hosts = await userService.getHosts()
    res.status(200).json(RadioProgramController.response({ programs, hosts }))
  }

  async addOne(req: Request, res: Response) {
    const program = await radioProgramService.add(req.body)
    res.status(200).json(RadioProgramController.response({ program }))
  }

  async addSchedule(req: Request, res: Response) {
    const program = await radioProgramService.addSchedule(req.body)
    res.status(200).json(RadioProgramController.response({ program }))
  }

  async deleteOne(req: Request, res: Response) {
    const programId = await radioProgramService.deleteWithTransaction(req.body.id)
    res.status(200).json(RadioProgramController.response({ id: programId }))
  }

  async deleteSchedule(req: Request, res: Response) {
    const program = await radioProgramService.deleteSchedule(req.body)
    res.status(200).json(RadioProgramController.response({ program }))
  }

  async one(req: Request, res: Response) {
    const program = await radioProgramService.one()
    res.status(200).json(program)
  }

  async updateOne(req: Request, res: Response, next: any) {
    const program = await radioProgramService.updateOne(req.body)
    res.status(200).json(RadioProgramController.response({ program }))
  }
}

export default new RadioProgramController()
