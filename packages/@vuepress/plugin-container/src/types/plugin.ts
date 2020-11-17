import type * as Renderer from 'markdown-it/lib/renderer'
import type * as Token from 'markdown-it/lib/token'
import type { LocaleConfig } from '@vuepress/shared'
import type { MarkdownEnv } from '@vuepress/markdown'

/**
 * Options for @vuepress/plugin-container
 */
export interface ContainerPluginOptions extends MarkdownItContainerOptions {
  type: string
  locales?: LocaleConfig<{
    defaultInfo: string
  }>
  before?: RenderPlaceFunction
  after?: RenderPlaceFunction
}

export type RenderPlaceFunction = (info: string) => string

/**
 * Options for markdown-it-container
 */
export interface MarkdownItContainerOptions {
  marker?: string
  validate?: (params: string) => boolean
  render?: MarkdownItContainerRenderFunction
}

export type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: any,
  env: MarkdownEnv,
  self: Renderer
) => string
