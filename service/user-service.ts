import bcrypt from 'bcryptjs'
import { User } from '../models/UserModel'
import tokenService from './token-service'
import ErrorApi from '../handlers/error-api'

class UserService {
  async registration({ email, password, firstName, lastName, roles = ['editor'] }: User) {
    const candidate = await User.findOne({ email })
    if (candidate) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} уже существует`)
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, firstName, lastName, roles })
    const { id, fullName } = user
    const tokens = tokenService.generateTokens({ id, email, fullName })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)
    return { ...tokens, user: { id, email, fullName, roles } }
  }

  async login({ email, password }: User) {
    const user = await User.findOne({ email })
    if (!user) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} не найден`)
    if (!user) throw new Error('login error')
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) throw ErrorApi.BadRequest(`Неверный пароль`)

    const { id, fullName, roles, avatar } = user
    const tokens = tokenService.generateTokens({ id, email, fullName, roles, avatar })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)

    return { ...tokens, user: { id, email, fullName, roles, avatar } }
  }

  async add(userData: User) {
    const user = await User.create(userData)
    return user
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
    const { id, email, fullName, roles, avatar } = user
    const tokens = tokenService.generateTokens({ id, email, fullName, roles, avatar })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)
    return { ...tokens, user: { id, email, fullName, roles, avatar } }
  }

  async getAll() {
    return await User.find()
  }

  async updateOne(data: User & { id: string; password_new: string }) {
    const user = await User.findById(data.id)
    if (!user) throw ErrorApi.userUpdateFail(`Пользователя с ID: ${data.id} не существует`)
    const isPasswordsEqual = await bcrypt.compare(data.password, user.password)
    if (!isPasswordsEqual) throw ErrorApi.userUpdateFail('Неверно указан текущий пароль')
    data.password = await bcrypt.hash(data.password_new, 5)
    const updatedUser = await User.findByIdAndUpdate(data.id, data, { new: true })
    if (!updatedUser) throw ErrorApi.userUpdateFail(`Ошибка при обновлении пользователя`)
    const { id, email, fullName, roles, avatar } = updatedUser
    const tokens = tokenService.generateTokens({ id, email, fullName, avatar })
    await tokenService.saveRefreshToken(id, tokens.refreshToken)
    return { ...tokens, user: { id, email, fullName, roles, avatar } }
  }
}

export default new UserService()
