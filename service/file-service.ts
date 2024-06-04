import fs from 'fs'

class FileService {
  readImages(src: string) {
    const baseSrc = src === '/images' ? `/Users/hardart/home${src}` : src
    return foldersMap(baseSrc)
  }
}

export default new FileService()

function foldersMap(path: string): string[] {
  const files = fs.readdirSync(path)
  return files
    .flatMap((f) => {
      const fullPath = `${path}/${f}`
      // return fullPath.replace('/Users/hardart/home', '')
      return fullPath
    })
    .filter((path) => {
      if (path.match(/\.(jpe?g|png|webp|avif)$/)) {
        return path.includes('_preview') ? path : undefined
      } else return !path.includes('.DS')
    })
}
