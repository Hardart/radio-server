import multer from 'multer'
import fs from 'fs'
import crypto from 'crypto'
import ErrorService from '../../service/error-service'
import AppError from '../../handlers/error-handler'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destructFile = new FileDestruct(file)
    const dest = destructFile.finalDestinationFolder

    try {
      fs.mkdirSync(dest, { recursive: true })
    } catch (error) {
      ErrorService.append(error)
      throw AppError.BadRequest('Произошла ошибка при сохранении файла, сообщите разработчику')
    }

    file.filename = destructFile.fileName

    cb(null, dest)
  },

  filename(req, file, cb) {
    cb(null, file.filename)
  }
})

export default multer({ storage })

class FileDestruct {
  private _devRoute = './assets/images/home'
  private _prodRoute = '/home'
  private _file: Express.Multer.File
  private _imageId

  constructor(file: Express.Multer.File) {
    this._file = file
    this._imageId = crypto.randomBytes(8).toString('hex')
  }

  private get _folderPath() {
    return this._file.fieldname
  }

  private get _fileExtension() {
    return this._file.originalname.replace(/.+\./, '')
  }

  private get _rootImagesFolder() {
    return process.env.MODE === 'dev' ? this._devRoute : this._prodRoute
  }

  get fileName() {
    return `${this._imageId}.${this._fileExtension}`
  }

  get finalDestinationFolder() {
    return `${this._rootImagesFolder}${this._folderPath}`
  }
}
