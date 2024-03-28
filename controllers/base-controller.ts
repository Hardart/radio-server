import { ResponseStatuses } from '../enums/responseStatuses'

class BaseController {
  static refreshAge = 1000 * 60 * 60 * 24 * 30 // 30 дней
  static refreshOptions = { maxAge: this.refreshAge, httpOnly: true }

  static response(res: object) {
    return {
      status: ResponseStatuses.SUCCESS,
      data: res,
    }
  }
}

export default BaseController
