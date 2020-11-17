import type { App } from '../../types'

/**
 * Generate client app root components temp file
 */
export const prepareClientAppRootComponents = async (
  app: App
): Promise<void> => {
  // plugin hook: clientAppRootComponentFiles
  const clientAppRootComponentFiles = await app.pluginApi.hooks.clientAppRootComponentFiles.process(
    app
  )

  // flat the hook result to get the file paths array
  const filePaths = clientAppRootComponentFiles.flat()

  // generate client app root components files entry
  const content = `\
${filePaths
  .map(
    (filePath, index) =>
      `import clientAppRootComponent${index} from '${filePath}'`
  )
  .join('\n')}

export const clientAppRootComponents = [
${filePaths.map((_, index) => `  clientAppRootComponent${index},`).join('\n')}
]
`

  await app.writeTemp('internal/clientAppRootComponents.js', content)
}
