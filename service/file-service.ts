import fs from 'fs'

class FileService {
  baseDir = process.env.NODE_EMV !== 'production' ? '/home' : '/Users/hardart/home'
  readImages(src: string) {
    const baseSrc = !src.includes(this.baseDir) ? `${this.baseDir}${src}` : src
    console.log(baseSrc)

    return this.foldersMap(baseSrc)
  }

  private foldersMap(path: string): string[] {
    const files = fs.readdirSync(path)
    return files
      .flatMap((f) => {
        const fullPath = `${path}/${f}`
        return fullPath.replace(this.baseDir, '')
        return fullPath
      })
      .filter((path) => {
        if (path.match(/\.(jpe?g|png|webp|avif)$/)) {
          return path.includes('_preview') ? path : undefined
        } else return !path.includes('.DS')
      })
  }
}

export default new FileService()
