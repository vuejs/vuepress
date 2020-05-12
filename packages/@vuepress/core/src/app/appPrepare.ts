import { App } from './createApp'
import { createAppPages } from './createAppPages'

export const appPrepare = async (app: App): Promise<void> => {
  // create pages
  app.pages = await createAppPages(app)

  // TODO: additionalPages

  // apply plugin option: onPrepared
  await app.pluginApi.applyOption('onPrepared', app)

  // apply plugin option: clientDynamicModules
  await app.pluginApi.applyOption('clientDynamicModules', app)

  // TODO: enhanceAppFiles
  // TODO: globalUIComponents
}
