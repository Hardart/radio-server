import sharp from 'sharp'
import { Response, NextFunction, Request } from 'express'
const sizes = [150, 300, 450, 700, 1200] as const
export async function resizeImage(req: Request, res: Response, next: NextFunction) {
  const file = req.file

  if (!file) return next()

  switch (file.fieldname) {
    case 'avatar':
      sizes.forEach(async size => {
        await sharp(file.path).resize({ width: size }).webp({ quality: 85 }).toFile(toPath(file.path, size))
      })
      await sharp(file.path).resize({ width: 75 }).webp({ quality: 85 }).toFile(toPath(file.path, 75))
      req.file!.path = toPath(file.path, 75)
      break
    case 'gallery':
      await sharp(file.path).resize({ width: 1530, height: 420 }).webp({ quality: 90 }).toFile(toPath(file.path, 1500))
  }

  next()
}

const toPath = (path: string, size: number) => path.replace(/\.([^.\\/:*?"<>|\r\n]+)$/, `_${size}.webp`)
