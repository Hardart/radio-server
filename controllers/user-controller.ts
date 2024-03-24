import type { Response, Request, NextFunction } from 'express'
import type { UserFormData } from '../types/user'
import userService from '../service/user-service'
import ErrorApi from '../handlers/error-api'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      // const validErrors = validationResult(req)
      // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
      const { email, password, name } = req.body as UserFormData
      console.log(email)
      const { accessToken } = await userService.registration({ email, password, name })
      // res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json({ accessToken })
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // const validErrors = validationResult(req)
      // if (!validErrors.isEmpty()) return next(ErrorApi.BadRequest('Ошибка при валидации', validErrors.array()))
      const { email, password } = req.body
      const { accessToken, refreshToken } = await userService.login({ email, password })
      res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const tokenData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', tokenData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.status(200).json({ accessToken: tokenData.accessToken, refreshToken: tokenData.refreshToken })
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('REQUEST TO CHECK')
      if (!req.body?.user) return next(ErrorApi.UnathorizedError())
      return res.status(200).json({ user: req.body.user })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
