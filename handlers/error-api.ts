export default class ErrorApi extends Error {
  statusCode
  isOperational
  custom
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.custom = true
    Error.captureStackTrace(this, this.constructor)
  }

  static articleExist() {
    return new ErrorApi(11000, 'Новость с таким слагом уже существует')
  }
}
