import fs from 'fs'

class FileService {
  baseDir = process.env.MODE === 'dev' ? './assets/images/home' : '/home'
  readImages(src: string) {
    const baseSrc = !src.includes(this.baseDir) ? `${this.baseDir}${src}` : src
    return this.foldersMap(baseSrc)
  }

  private foldersMap(path: string): string[] {
    const files = fs.readdirSync(path)
    return files
      .flatMap((f) => {
        const fullPath = `${path}/${f}`
        return fullPath.replace(this.baseDir, '')
      })
      .filter((path) => {
        if (path.match(/\.(jpe?g|png|webp|avif)$/)) {
          return path.includes('_preview') ? path : undefined
        } else return !path.includes('.DS')
      })
  }
}

export default new FileService()
