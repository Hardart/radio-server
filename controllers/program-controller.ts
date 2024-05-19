import type { Response, Request, NextFunction } from 'express'
import programService from '../service/program-service'
import BaseController from './base-controller'
import userService from '../service/user-service'

class ProgramController extends BaseController {
  async list(req: Request, res: Response, next: NextFunction) {
    const programs = await programService.list()
    const hosts = await userService.getHosts()
    res.status(200).json(ProgramController.response({ programs, hosts }))
  }

  async addOne(req: Request, res: Response, next: NextFunction) {
    const program = await programService.add(req.body)
    res.status(200).json(ProgramController.response({ program }))
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const program = await programService.deleteOne(req.body.id)
    res.status(200).json(ProgramController.response({ program }))
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const program = await programService.one()
    res.status(200).json(program)
  }

  async updateOne(req: Request, res: Response, next: any) {
    const program = await programService.updateOne(req.body)
    res.status(200).json(ProgramController.response({ program }))
  }
}

export default new ProgramController()
