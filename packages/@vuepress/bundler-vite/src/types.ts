import type { InlineConfig } from 'vite'
import { Options as VuePluginOptions } from '@vitejs/plugin-vue'

/**
 * Options for bundler-vite
 */
export interface ViteBundlerOptions {
  viteOptions?: InlineConfig
  vuePluginOptions?: VuePluginOptions
}
