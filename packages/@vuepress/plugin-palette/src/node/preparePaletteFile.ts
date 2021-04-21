import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import type { PalettePluginOptions } from './palettePlugin'

export const preparePaletteFile = async (
  app: App,
  {
    userPaletteFile,
    tempPaletteFile,
    importCode,
  }: Pick<
    Required<PalettePluginOptions>,
    'userPaletteFile' | 'tempPaletteFile' | 'importCode'
  >
): Promise<string> => {
  const userPalette = app.dir.source(userPaletteFile)

  let content = ''

  if (await fs.pathExists(userPalette)) {
    content += importCode(userPalette)
  }

  return app.writeTemp(tempPaletteFile, content)
}
