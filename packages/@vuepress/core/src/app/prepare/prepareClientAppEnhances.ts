import type { App } from '../../types'

/**
 * Generate client app enhances temp file
 */
export const prepareClientAppEnhances = async (app: App): Promise<void> => {
  // plugin hook: clientAppEnhanceFiles
  const clientAppEnhanceFiles = await app.pluginApi.hooks.clientAppEnhanceFiles.process(
    app
  )

  // flat the hook result to get the file paths array
  const filePaths = clientAppEnhanceFiles.flat()

  // generate client app enhance files entry
  const content = `\
${filePaths
  .map(
    (filePath, index) => `import clientAppEnhance${index} from '${filePath}'`
  )
  .join('\n')}

export const clientAppEnhances = [
${filePaths.map((_, index) => `  clientAppEnhance${index},`).join('\n')}
]
`

  await app.writeTemp('internal/clientAppEnhances.js', content)
}
