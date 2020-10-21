import type { Plugin } from '@vuepress/core'

export type NprogressPluginOptions = Record<never, never>

declare const nprogressPlugin: Plugin<NprogressPluginOptions>

export = nprogressPlugin
