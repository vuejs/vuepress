import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { handleDevtool } from './handleDevtool'
import { handleMode } from './handleMode'
import { handleModule } from './handleModule'
import { handleOutput } from './handleOutput'
import { handleResolve } from './handleResolve'
import { handlePlugins } from './handlePlugins'

export const createBaseConfig = (app: App): Config => {
  // create new webpack-chain config
  const config = new Config()

  /**
   * mode
   */
  handleMode(config, app)

  /**
   * output
   */
  handleOutput(config, app)

  /**
   * devtool
   */
  handleDevtool(config, app)

  /**
   * resolve
   */
  handleResolve(config, app)

  /**
   * module
   */
  handleModule(config, app)

  /**
   * plugins
   */
  handlePlugins(config)

  // apply plugin option: alias
  app.pluginApi.applyOption('alias', config)

  // apply plugin option: define
  app.pluginApi.applyOption('define', config)

  return config
}
