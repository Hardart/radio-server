import fs from 'fs'
export default class ErrorService {
  static logsRootPath = process.env.NODE_ENV === 'production' ? '../logs' : './logs'
  static get dateAndTime() {
    return Intl.DateTimeFormat('ru', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date())
  }

  static append(error: unknown) {
    try {
      const root = this.logsRootPath
      fs.appendFileSync(`${root}/errors.txt`, `${this.dateAndTime}: ${error}\n`, { encoding: 'utf-8' })
    } catch (error) {
      console.log(error)
    }
  }

  static saveStream(streamTitle?: string) {
    try {
      const root = this.logsRootPath
      fs.appendFileSync(`${root}/stream.txt`, `${this.dateAndTime}: ${streamTitle}\n`, {
        encoding: 'utf-8'
      })
    } catch (error) {
      this.append(error)
    }
  }
}
