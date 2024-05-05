import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'

const getExtension = (fileSrc: string) => fileSrc.replace(/.+\./, '')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderName = file.fieldname
    const folderId = folderIdFromCurrentDate()
    const imageId = crypto.randomBytes(8).toString('hex')
    const ext = getExtension(file.originalname)
    const fileName = `${imageId}.${ext}`
    const dest = folderName == 'news' ? `./assets/images/${folderName}/${folderId}` : `./assets/images/${folderName}`
    fs.mkdirSync(dest, { recursive: true })
    file.filename = fileName

    cb(null, dest)
  },

  filename(req, file, cb) {
    cb(null, file.filename)
  },
})

export default multer({ storage })


function folderIdFromCurrentDate() {
  const date = new Date()
  const year = Intl.DateTimeFormat('ru', {year: 'numeric'}).format(date)
  const month = Intl.DateTimeFormat('ru', {month: '2-digit'}).format(date)
  const day = Intl.DateTimeFormat('ru', {day: '2-digit'}).format(date)
  return `${year}${month}${day}`
}