import type { UserFormData } from '../types/user'
import bcrypt from 'bcryptjs'
import { User } from '../models/UserModel'
import tokenService from './token-service'
import ErrorApi from '../handlers/error-api'

class UserService {
  async registration({ email, password, name, roles = ['editor'] }: UserFormData) {
    const candidate = await User.findOne({ email })
    if (candidate) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} уже существует`)
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, name, roles })
    console.log(user)
    const { id } = user
    const tokens = tokenService.generateTokens({ id, email, name })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)
    return { ...tokens, user: { id, email, name, roles } }
  }

  async login({ email, password }: UserFormData) {
    const user = await User.findOne({ email })
    if (!user) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} не найден`)
    if (!user) throw new Error('login error')
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) throw ErrorApi.BadRequest(`Неверный пароль`)

    const { id, name, roles } = user
    const tokens = tokenService.generateTokens({ id, email, name, roles })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)

    return { ...tokens, user: { id, email, name, roles } }
  }

  async logout(refreshToken: string) {
    const token = tokenService.clearToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ErrorApi.UnathorizedError()
    const userData = tokenService.validateRefreshToken(refreshToken) // проверяем валидность refresh token
    const tokenData = await tokenService.getToken(refreshToken) // проверяем этот token в БД
    if (!userData || !tokenData) throw ErrorApi.UnathorizedError()
    const user = await User.findById(userData.id)
    if (!user) throw Error('Пользователь не найден')
    const { id, email, name, roles } = user
    const tokens = tokenService.generateTokens({ id, email, name, roles })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)
    return { ...tokens, user: { id, email, name, roles } }
  }

  async getAll() {
    try {
      return await User.find()
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserService()
