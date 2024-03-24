export default class ErrorApi extends Error {
  statusCode
  isOperational
  errors
  custom
  constructor(statusCode: number, message: string, errors: any[] = []) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.custom = true
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }

  static BadRequest(message: string, errors?: any[]) {
    return new ErrorApi(400, message, errors)
  }

  static NoEnvVariable(varaible: string) {
    return new ErrorApi(400, `Переменной ${varaible} нет в файле .env`)
  }

  static UnathorizedError() {
    return new ErrorApi(401, 'Пользователь не авторизован')
  }

  static articleExist() {
    return new ErrorApi(11000, 'Новость с таким слагом уже существует')
  }
}
