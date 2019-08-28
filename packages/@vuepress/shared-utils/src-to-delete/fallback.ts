import fs from 'fs-extra'

export function fsExistsFallback (files: string[]): string | void {
  for (const file of files) {
    if (fs.existsSync(file)) {
      return file
    }
  }
}
