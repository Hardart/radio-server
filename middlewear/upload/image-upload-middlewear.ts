import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'
import ErrorService from '../../service/error-service'
import AppError from '../../handlers/error-handler'

const getExtension = (fileSrc: string) => fileSrc.replace(/.+\./, '')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderName = file.fieldname
    const folderId = folderIdFromCurrentDate()
    const imageId = crypto.randomBytes(8).toString('hex')
    const ext = getExtension(file.originalname)
    const fileName = `${imageId}.${ext}`
    const rootImagesFolder = process.env.MODE === 'dev' ? './assets/images/home/images/' : '/home/images/'
    const dest =
      folderName == 'news' ? `${rootImagesFolder}${folderName}/${folderId}` : `${rootImagesFolder}${folderName}`

    try {
      fs.mkdirSync(dest, { recursive: true })
    } catch (error) {
      ErrorService.append(error)
      throw AppError.BadRequest('Произошла ошибка при сохранении файла, сообщите разработчику')
    }

    file.filename = fileName

    cb(null, dest)
  },

  filename(req, file, cb) {
    cb(null, file.filename)
  }
})

export default multer({ storage })

function folderIdFromCurrentDate() {
  const date = new Date()
  const year = Intl.DateTimeFormat('ru', { year: 'numeric' }).format(date)
  const month = Intl.DateTimeFormat('ru', { month: '2-digit' }).format(date)
  const day = Intl.DateTimeFormat('ru', { day: '2-digit' }).format(date)
  return `${year}${month}${day}`
}
