import type { Response, Request } from 'express'
import userService from '../service/user-service'

import BaseController from './base-controller'
import AppError from '../handlers/error-handler'

class UserController extends BaseController {
  async registration(req: Request, res: Response) {
    // const validErrors = validationResult(req)
    // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
    const user = await userService.registration(req.body)
    res.status(200).json(UserController.response({ user }))
  }

  async login(req: Request, res: Response) {
    // const validErrors = validationResult(req)
    // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
    const { accessToken, refreshToken, user } = await userService.login(req.body)
    res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
    res.status(200).json(UserController.response({ accessToken, user }))
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies
    const token = await userService.logout(refreshToken)
    res.cookie('refreshToken', refreshToken, { ...UserController.clearRefreshOptions })
    res.status(200).json(token)
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken: oldToken } = req.cookies
    const maybeTokens = await userService.refresh(oldToken)
    if (maybeTokens) {
      const { accessToken, refreshToken } = maybeTokens
      res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
      res.status(200).json(UserController.response({ accessToken }))
    } else {
      res.cookie('refreshToken', '', { ...UserController.clearRefreshOptions })
      res.status(200).json({ status: 'fail' })
    }
  }

  async update(req: Request, res: Response) {
    const userData = req.body
    const { accessToken, refreshToken } = await userService.updateOne(userData)
    res.cookie('refreshToken', refreshToken, { ...UserController.refreshOptions })
    res.status(200).json(UserController.response({ accessToken }))
  }

  async check(req: Request, res: Response) {
    if (!req.body?.user) throw AppError.UnathorizedError()
    res.status(200).json(UserController.response({ userId: req.body.user.id }))
  }

  async add(req: Request, res: Response) {
    const userData = req.body
    if (!userData) throw AppError.UnathorizedError()
    const user = await userService.registration(userData)
    res.status(200).json(UserController.response({ user }))
  }

  async list(_: Request, res: Response) {
    const users = await userService.getAll()
    res.status(200).json(UserController.response({ users }))
  }

  async deleteOne(req: Request, res: Response) {
    const user = await userService.deleteOne(req.body.id)
    res.status(200).json(UserController.response({ user }))
  }

  async getHosts(req: Request, res: Response) {
    const hosts = await userService.getHosts()
    res.status(200).json(UserController.response({ hosts }))
  }

  async findById(req: Request, res: Response) {
    const host = await userService.findById(req.body.id)
    res.status(200).json(UserController.response({ host }))
  }
}

export default new UserController()
