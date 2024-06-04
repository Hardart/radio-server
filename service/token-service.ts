import jwt from 'jsonwebtoken'
import { Token } from '../models/TokenModel'
import { User } from '../models/UserModel'
import AppError from '../handlers/error-handler'

class TokenService {
  generateTokens(payload: object) {
    const access = process.env.ACCESS_TOKEN
    const refresh = process.env.REFRESH_TOKEN
    if (!access || !refresh) throw AppError.NoEnvVariable('access or refresh')
    const accessToken = jwt.sign(payload, access, { expiresIn: '30m', algorithm: 'HS512', noTimestamp: true })
    const refreshToken = jwt.sign(payload, refresh, { expiresIn: '3h' })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    return await Token.create({ user: userId, refreshToken })
  }

  async clearToken(refreshToken: string) {
    return await Token.deleteOne({ refreshToken })
  }

  async getToken(refreshToken: string) {
    return await Token.findOne({ refreshToken })
  }

  validateAccessToken(token: string) {
    try {
      const access = process.env.ACCESS_TOKEN
      if (typeof access !== 'string') throw AppError.NoEnvVariable('access')
      return jwt.verify(token, access) as User & { id: string; fullName: string }
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const refresh = process.env?.REFRESH_TOKEN
      if (typeof refresh !== 'string') throw AppError.NoEnvVariable('refresh')
      return jwt.verify(token, refresh) as User & { id: string }
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
