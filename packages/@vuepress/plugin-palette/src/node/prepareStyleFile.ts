import type { App } from '@vuepress/core'
import { fs } from '@vuepress/utils'
import type { PalettePluginOptions } from './palettePlugin'

export const prepareStyleFile = async (
  app: App,
  {
    userStyleFile,
    tempStyleFile,
    importCode,
  }: Pick<
    Required<PalettePluginOptions>,
    'userStyleFile' | 'tempStyleFile' | 'importCode'
  >
): Promise<string> => {
  const userStyle = app.dir.source(userStyleFile)

  let content = ''

  if (await fs.pathExists(userStyle)) {
    content += importCode(userStyle)
  }

  return app.writeTemp(tempStyleFile, content)
}
