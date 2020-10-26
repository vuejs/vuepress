import type { UserConfig } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

export const userConfigTsPath = '.vuepress/config.ts'

/**
 * Resolve .vuepress/config.ts from source directory
 */
export const resolveUserConfigTs = async (
  source: string
): Promise<UserConfig | null> => {
  // TODO: better solution to resolve ts file
  // load .vuepress/config.ts
  const configTs = path.resolve(source, userConfigTsPath)
  if (await fs.pathExists(configTs)) {
    // lazy load typescript
    const ts = require('typescript')

    // transpile .vuepress/config.ts to js
    const tsContent = (await fs.readFile(configTs)).toString()
    const jsContent = ts.transpileModule(tsContent, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText

    // write js to temp file
    const tempFile = path.resolve(__dirname, '../../.temp/config.js')
    await fs.outputFile(tempFile, jsContent)

    // load js from temp file
    delete require.cache[tempFile]
    const result = require(tempFile)

    // remove temp file after loaded
    await fs.remove(tempFile)

    return result
  }

  return null
}
