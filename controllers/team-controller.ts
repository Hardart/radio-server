import type { Response, Request } from 'express'
import teamService from '../service/team-service'

class TeamController {
  async getAll(_: Request, res: Response) {
    const categories = await teamService.all()
    return res.json(categories)
  }
}

export default new TeamController()
