import { ResponseStatuses } from '../enums/responseStatuses'

class BaseController {
  // static refreshAge = 1000 * 60 * 60 * 24 * 30 // 30 дней
  // static refreshAge = 1000 * 60 * 3 // 3 минуты
  // static refreshAge = 1000 * 60 * 30 // 30 минут
  private static refreshAge = 1000 * 60 * 60 * 5 // 5 часов
  static refreshOptions = { maxAge: this.refreshAge, httpOnly: true }
  static clearRefreshOptions = { maxAge: 0, httpOnly: true }

  static response(res?: object) {
    return {
      status: ResponseStatuses.SUCCESS,
      data: res
    }
  }
}

export default BaseController
