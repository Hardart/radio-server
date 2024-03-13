import fs from 'fs'
export default class ErrorService {
  static append(error: unknown) {
    fs.appendFile(
      './logs/errors.txt',
      `${new Date().toLocaleDateString('ru', { dateStyle: 'short' })}: ${error}\n`,
      { encoding: 'utf-8' },
      err => {
        console.log(err)
      }
    )
  }
}
