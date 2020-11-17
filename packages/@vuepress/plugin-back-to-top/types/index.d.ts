import type { Plugin } from '@vuepress/core'

export type BackToTopPluginOptions = Record<never, never>

declare const backToTopPlugin: Plugin<BackToTopPluginOptions>

export = backToTopPlugin
