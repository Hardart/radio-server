import type { Response, Request } from 'express'

import BaseController from './base-controller'
import settingsService from '../service/settings-service'

class SettingsController extends BaseController {
  async list(req: Request, res: Response) {
    const settings = await settingsService.list()
    res.status(200).json(SettingsController.response({ settings }))
  }

  async changeSiteStatus(req: Request, res: Response) {
    await settingsService.changeSiteStatus(req.body)

    res.status(200).json(SettingsController.response())
  }

  async updateSettings(req: Request, res: Response) {
    const sett = await settingsService.update(req.body)
    res.status(200).json(SettingsController.response(sett))
  }
}

export default new SettingsController()
