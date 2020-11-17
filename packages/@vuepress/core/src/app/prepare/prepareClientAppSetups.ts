import type { App } from '../../types'

/**
 * Generate client app setups temp file
 */
export const prepareClientAppSetups = async (app: App): Promise<void> => {
  // plugin hook: clientAppSetupFiles
  const clientAppSetupFiles = await app.pluginApi.hooks.clientAppSetupFiles.process(
    app
  )

  // flat the hook result to get the file paths array
  const filePaths = clientAppSetupFiles.flat()

  // generate client app setup files entry
  const content = `\
${filePaths
  .map((filePath, index) => `import clientAppSetup${index} from '${filePath}'`)
  .join('\n')}

export const clientAppSetups = [
${filePaths.map((_, index) => `  clientAppSetup${index},`).join('\n')}
]
`

  await app.writeTemp('internal/clientAppSetups.js', content)
}
