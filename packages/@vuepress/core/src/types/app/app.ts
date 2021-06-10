import type { Markdown } from '@vuepress/markdown'
import type { SiteData } from '@vuepress/shared'
import type { BundlerDev, BundlerBuild } from '../bundler'
import type { Page } from '../page'
import type { Plugin, PluginOptions } from '../plugin'
import type { PluginApi } from '../pluginApi'
import type { AppOptions } from './options'
import type { AppDir, AppEnv, AppWriteTemp } from './utils'

/**
 * Vuepress app
 */
export interface App {
  /**
   * Version of vuepress core
   */
  version: string

  /**
   * Options that filled all optional fields with a default value
   */
  options: AppOptions

  /**
   * Directory utils
   */
  dir: AppDir

  /**
   * Environment flags
   */
  env: AppEnv

  /**
   * Site data, which will be used in client side
   */
  siteData: SiteData

  /**
   * Markdown-it instance
   */
  markdown: Markdown

  /**
   * Plugin system
   */
  pluginApi: PluginApi

  /**
   * Write temp file
   */
  writeTemp: AppWriteTemp

  /**
   * Use a plugin
   */
  use: <T extends PluginOptions>(
    plugin: Plugin<T> | string,
    config?: Partial<T>
  ) => this

  /**
   * Initialize app.
   *
   * - Theme and plugin will be loaded.
   * - Layouts and pages will be resolved.
   */
  init: () => Promise<void>

  /**
   * Prepare data for client and write temp files.
   *
   * Should be called after `app.init()`.
   */
  prepare: () => Promise<void>

  /**
   * Layout components.
   *
   * Only available after initialization
   */
  layouts: Record<string, string>

  /**
   * Page objects.
   *
   * Only available after initialization
   */
  pages: Page[]
}

/**
 * Vuepress dev app
 */
export interface DevApp extends App {
  /**
   * Start dev server
   *
   * Should be called after `app.prepare()`.
   */
  dev: () => ReturnType<BundlerDev>
}

/**
 * Vuepress build app
 */
export interface BuildApp extends App {
  /**
   * Build static files
   *
   * Should be called after `app.prepare()`.
   */
  build: () => ReturnType<BundlerBuild>
}
