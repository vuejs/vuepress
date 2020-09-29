import type { ThemeObject } from '../theme'

/**
 * Vuepress theme system
 */
export interface ThemeApi {
  /**
   * Current theme
   */
  theme: ThemeInfo

  /**
   * Parent theme
   */
  parentTheme: ThemeInfo | null

  /**
   * Layouts
   */
  layouts: ThemeLayout[]
}

/**
 * Vuepress theme info
 */
export interface ThemeInfo {
  /**
   * Path of theme
   */
  path: string

  /**
   * Theme plugin object
   */
  plugin: ThemeObject
}

/**
 * Vuepress theme layout
 */
export interface ThemeLayout {
  /**
   * Path of layout
   */
  path: string

  /**
   * Name of layout
   */
  name: string
}
