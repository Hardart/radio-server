import bcrypt from 'bcryptjs'
import { User } from '../models/UserModel'
import tokenService from './token-service'
import AppError from '../handlers/error-handler'

// const hosts = [
//   {
//     id: '677a784ef2e5aac342025d17',
//     fullName: 'Евгений Богомолов',
//     position: ['host'],
//     avatar: '/images/team/no_image.webp',
//     programs: ['Шоу "Без названия"']
//   },
//   {
//     id: '32r343fsdvhsvvnvvnjfn',
//     fullName: 'Павел Планов',
//     position: ['host'],
//     avatar: '/images/team/no_image.webp',
//     programs: ['Шоу "Без названия"']
//   }
// ]

class UserService {
  async registration(user: User) {
    const candidate = await User.findOne({ email: user.email })
    if (candidate) throw AppError.BadRequest(`Пользователь с адресом ${user.email} уже существует`)
    const hashPassword = await bcrypt.hash(user.password, 5)
    return await User.create({ ...user, password: hashPassword })
  }

  async login({ email, password }: User) {
    const user = await User.findOne({ email })
    if (!user) throw AppError.BadRequest(`Пользователь с адресом ${email} не найден`)
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) throw AppError.BadRequest(`Неверный пароль`)
    const tokens = tokenService.generateTokens(UserService.userData(user))
    await tokenService.saveRefreshToken(UserService.userData(user).id, tokens.refreshToken)

    return { ...tokens, user: UserService.userData(user) }
  }

  async add(userData: User) {
    const user = await User.create(userData)
    return user
  }

  async logout(refreshToken: string) {
    return tokenService.clearToken(refreshToken)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw AppError.UnathorizedError()
    const userData = tokenService.validateRefreshToken(refreshToken) // проверяем валидность refresh token
    const tokenData = await tokenService.getToken(refreshToken) // проверяем этот token в БД
    if (!userData || !tokenData) return null
    const user = await User.findById(userData.id)
    if (!user) throw Error('Пользователь не найден')
    const tokens = tokenService.generateTokens(UserService.userData(user))
    await tokenService.saveRefreshToken(UserService.userData(user).id, tokens.refreshToken)
    return { ...tokens, user: UserService.userData(user) }
  }

  async getAll() {
    return await User.find().select('-password')
  }

  async updateOne(data: User & { id: string; password_new: string }) {
    const user = await User.findById(data.id)
    if (!user) throw AppError.userUpdateFail(`Пользователя с ID: ${data.id} не существует`)
    const isPasswordsEqual = await bcrypt.compare(data.password, user.password)
    if (!isPasswordsEqual) throw AppError.userUpdateFail('Неверно указан текущий пароль')
    const newPassword = data.password_new ? data.password_new : data.password
    data.password = await bcrypt.hash(newPassword, 5)
    const updatedUser = await User.findByIdAndUpdate(data.id, data, { new: true })
    if (!updatedUser) throw AppError.userUpdateFail(`Ошибка при обновлении пользователя`)
    const tokens = tokenService.generateTokens(UserService.userData(updatedUser))
    await tokenService.saveRefreshToken(UserService.userData(updatedUser).id, tokens.refreshToken)
    return { ...tokens, user: UserService.userData(updatedUser) }
  }

  async deleteOne(id: string) {
    return await User.findByIdAndDelete(id).select('-password')
  }

  async getHosts() {
    const hosts = await User.find({ $and: [{ roles: 'host' }, { roles: { $ne: 'admin' } }] })
    return hosts
  }

  async findById(id: string) {
    return await User.findById(id)
  }

  // NEED FIX
  private static userData(user: User) {
    const { id, email, fullName, roles, avatar, firstName, lastName } = user as unknown as User & { id: string }
    return { id, email, fullName, roles, avatar, firstName, lastName }
  }
}

export default new UserService()
