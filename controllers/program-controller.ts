import type { Response, Request, NextFunction } from 'express'
import programService from '../service/program-service'
import BaseController from './base-controller'

class ProgramController extends BaseController {
  async list(req: Request, res: Response, next: NextFunction) {
    const programs = await programService.list()
    res.status(200).json(ProgramController.response({ programs }))
  }

  async one(req: Request, res: Response, next: NextFunction) {
    const program = await programService.one()
    res.status(200).json(program)
  }
}

export default new ProgramController()
