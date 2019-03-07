import App, { AppOptions } from './App'
import Page from './Page'
import Frontmatter from './Frontmatter'
import ClientComputedMixin from './Mixin'

export * from './App'
export * from './Page'
export * from './options'

export {
  App,
  Page,
  Frontmatter,
  ClientComputedMixin,
}

/**
 * create a VuePress app for for customization
 * @param options options for VuePress app
 */
export function createApp(options?: AppOptions): App

/**
 * start a development server
 * @param options options for VuePress app
 */
export function dev(options?: AppOptions): Promise<void>

/**
 * build directory as a static site
 * @param options options for VuePress app
 */
export function build(options?: AppOptions): Promise<void>

/**
 * copy the default theme into `.vuepress/theme` for customization
 * @param dir targeted directory
 */
export function eject(dir: string): Promise<void>
