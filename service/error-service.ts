import fs from 'fs'
export default class ErrorService {
  static append(error: unknown) {
    try {
      fs.appendFileSync('./logs/errors.txt', `${new Date().toLocaleDateString('ru')}: ${error}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }
  static saveStream(streamTitle?: string) {
    try {
      fs.appendFileSync('./logs/stream.txt', `${new Date().toLocaleDateString('ru')}: ${streamTitle}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }
}
