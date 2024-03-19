import sharp from 'sharp'
import { Response, NextFunction, Request } from 'express'
const sizes = [150, 300, 450, 700, 1200] as const
export async function resizeImage(req: Request, res: Response, next: NextFunction) {
  const file = req.file
  if (!file) return next()

  const path = file.path
  let filePath = ''
  switch (file.fieldname) {
    case 'avatar':
      sizes.forEach(async size => {
        sharp(path).resize({ width: size }).webp({ quality: 85 }).toFile(toPath(path, size))
      })
      await sharp(path).resize({ width: 75 }).webp({ quality: 85 }).toFile(toPath(path, 75))
      req.file!.path = toPath(path, 75)
      break
    case 'gallery':
      await sharp(path).resize({ width: 1530, height: 420 }).webp({ quality: 90 }).toFile(toPath(path, 1500))
      break
    case 'news':
      sharp(path).resize({ width: 600, height: 360 }).webp({ quality: 90 }).toFile(toPath(path, '_600'))
      filePath = toPath(path, '_orig')
      await sharp(path).webp({ quality: 90 }).toFile(filePath)
      req.file!.path = filePath
      break
  }

  sharp(path).resize({ width: 200 }).webp({ quality: 85 }).toFile(toPath(path, '_preview'))

  next()
}

const toPath = (path: string, size: number | string = '') => path.replace(/\.([^.\\/:*?"<>|\r\n]+)$/, `${size}.webp`)
