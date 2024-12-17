import sharp from 'sharp'
import { Response, NextFunction, Request } from 'express'

export async function resizeImage(req: Request, res: Response, next: NextFunction) {
  if (!req.file) return next()
  let path
  const file = req.file
  const pathToOriginalFile = file.path

  await sharp(pathToOriginalFile).webp({ quality: 90 }).toFile(toPath(pathToOriginalFile, 'orig'))
  const pathToNewFile = `${toPath(pathToOriginalFile, 'orig')}`
  sharp(pathToNewFile).resize({ width: 200 }).webp({ quality: 85 }).toFile(toPath(pathToOriginalFile, 'preview'))

  switch (file.fieldname) {
    case 'avatar':
      path = toPath(pathToOriginalFile, 75)
      await sharp(pathToNewFile).resize({ width: 75 }).webp({ quality: 85 }).toFile(path)
      req.file.path = path
      break
    case 'gallery':
      path = toPath(pathToOriginalFile, '1536x658')
      await sharp(pathToNewFile).resize({ width: 1536, height: 658 }).webp().toFile(path)
      path = toPath(pathToOriginalFile, '1280x549')
      await sharp(pathToNewFile).resize({ width: 1280, height: 549 }).webp().toFile(path)
      path = toPath(pathToOriginalFile, '1024x439')
      await sharp(pathToNewFile).resize({ width: 1024, height: 439 }).webp({ quality: 95 }).toFile(path)
      path = toPath(pathToOriginalFile, '752x322')
      await sharp(pathToNewFile).resize({ width: 752, height: 322 }).webp({ quality: 95 }).toFile(path)
      path = toPath(pathToOriginalFile, '624x267')
      await sharp(pathToNewFile).resize({ width: 624, height: 267 }).webp({ quality: 90 }).toFile(path)
      path = toPath(pathToOriginalFile, '420x180')
      await sharp(pathToNewFile).resize({ width: 420, height: 180 }).webp({ quality: 80 }).toFile(path)
      path = toPath(pathToOriginalFile, '350x150')
      await sharp(pathToNewFile).resize({ width: 350, height: 150 }).webp({ quality: 80 }).toFile(path)
      req.file.path = path
      break
    case 'news':
      sharp(pathToNewFile)
        .resize({ width: 600, height: 360 })
        .webp({ quality: 90 })
        .toFile(toPath(pathToOriginalFile, 600))
      req.file.path = toPath(pathToOriginalFile, 'orig')
      break
    case 'programs':
      path = toPath(pathToOriginalFile, 600)
      await sharp(pathToNewFile).resize({ width: 600 }).webp({ quality: 90 }).toFile(path)
      req.file.path = path
      break
  }

  next()
}

const toPath = (path: string, size: number | string = '') => path.replace(/\.([^.\\/:*?"<>|\r\n]+)$/, `_${size}.webp`)
