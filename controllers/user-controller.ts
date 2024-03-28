import type { Response, Request } from 'express'
import userService from '../service/user-service'
import ErrorApi from '../handlers/error-api'
import BaseController from './base-controller'

class UserController extends BaseController {
  async registration(req: Request, res: Response) {
    // const validErrors = validationResult(req)
    // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
    const userData = req.body
    const { accessToken } = await userService.registration(userData)
    res.status(200).json(UserController.response({ accessToken }))
  }

  async login(req: Request, res: Response) {
    // const validErrors = validationResult(req)
    // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
    const userData = req.body
    const { accessToken, refreshToken } = await userService.login(userData)
    res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
    res.status(200).json(UserController.response({ accessToken }))
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies
    const token = await userService.logout(refreshToken)
    res.status(200).json(token)
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken: oldToken } = req.cookies
    const { accessToken, refreshToken } = await userService.refresh(oldToken)
    res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
    res.status(200).json(UserController.response({ accessToken }))
  }

  async update(req: Request, res: Response) {
    const userData = req.body
    const { accessToken, refreshToken } = await userService.updateOne(userData)
    res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
    res.status(200).json(UserController.response({ accessToken }))
  }

  async check(req: Request, res: Response) {
    if (!req.body?.user) throw ErrorApi.UnathorizedError()
    res.status(200).json(UserController.response({ userId: req.body.user.id }))
  }

  async add(req: Request, res: Response) {
    const userData = req.body
    if (!userData) throw ErrorApi.UnathorizedError()
    const user = await userService.add(userData)
    res.status(200).json(UserController.response({ user }))
  }

  async list(req: Request, res: Response) {
    const users = await userService.getAll()
    res.status(200).json(UserController.response({ users }))
  }
}

export default new UserController()
