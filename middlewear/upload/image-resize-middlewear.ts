import sharp from 'sharp'
import { Response, NextFunction, Request } from 'express'

export async function resizeImage(req: Request, res: Response, next: NextFunction) {
  req.file = Array.isArray(req.files) ? req.files[0] : req.file
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
      const gallerySizes = [
        {
          width: 1536,
          height: 658,
          quality: 100
        },
        {
          width: 1280,
          height: 549,
          quality: 100
        },
        {
          width: 1024,
          height: 439,
          quality: 95
        },
        {
          width: 752,
          height: 322,
          quality: 95
        },
        {
          width: 624,
          height: 267,
          quality: 90
        },
        {
          width: 420,
          height: 180,
          quality: 80
        },
        {
          width: 350,
          height: 150,
          quality: 75
        }
      ]

      for await (const sizeItem of gallerySizes) {
        const { width, height, quality } = sizeItem
        const size = `${width}x${height}`
        path = toPath(pathToOriginalFile, size)
        await sharp(pathToNewFile).resize({ width, height }).webp({ quality }).toFile(path)
        req.file.path = path
      }

      break
    case 'news':
      sharp(pathToNewFile)
        .resize({ width: 600, height: 360 })
        .webp({ quality: 90 })
        .toFile(toPath(pathToOriginalFile, 600))
      req.file.path = toPath(pathToOriginalFile, 'orig')
      break
    case 'programs':
      const programSizes = [
        {
          width: 600,
          height: 600,
          quality: 90
        },
        {
          width: 300,
          height: 300,
          quality: 80
        },
        {
          width: 100,
          height: 100,
          quality: 70
        },
        {
          width: 50,
          height: 50,
          quality: 60
        }
      ]

      for await (const sizeItem of programSizes) {
        const { width, quality } = sizeItem
        path = toPath(pathToOriginalFile, width)
        await sharp(pathToNewFile).resize({ width }).webp({ quality }).toFile(path)
        req.file.path = path
      }

      break

    default:
      path = toPath(pathToOriginalFile, 75)
      await sharp(pathToNewFile).resize({ width: 75 }).webp({ quality: 85 }).toFile(path)
      req.file.path = path

      break
  }

  next()
}

const toPath = (path: string, size: number | string = '') => path.replace(/\.([^.\\/:*?"<>|\r\n]+)$/, `_${size}.webp`)
