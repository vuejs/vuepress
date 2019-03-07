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

export function createApp(options?: AppOptions): App

export function dev(options?: AppOptions): Promise<void>

export function build(options?: AppOptions): Promise<void>

export function eject(dir: string): Promise<void>
