import { UserPlugins } from "./plugin";
import { Context } from "./context";
import { Config } from "./config";
import { PluginEntryOptions } from "./plugin-api";

/**
 * Default theme config type
 */
export type ThemeConfig = any;

/**
 * Export type of theme entry
 *
 * @see https://vuepress.vuejs.org/theme/option-api.html
 */
export type ThemeEntry = PluginEntryOptions & {
  /**
   * plugins
   */
  plugins?: UserPlugins;
  /**
   * HTML template path used in dev mode.
   *
   * @default https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html
   * @see https://vuepress.vuejs.org/theme/option-api.html#devtemplate
   */
  devTemplate?: string;
  /**
   * HTML template path used in build mode
   *
   * @default https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.ssr.html
   * @see https://vuepress.vuejs.org/theme/option-api.html#ssrtemplate
   */
  ssrTemplate?: string;
  /**
   * Extends a theme
   *
   * @see https://vuepress.vuejs.org/theme/option-api.html#extend
   */
  extend?: string;
  /**
   * Global layout component is a component responsible for the global layout strategy.
   *
   * @see https://vuepress.vuejs.org/theme/option-api.html#globallayout
   */
  globalLayout?: string;
};

/**
 * Export type of theme entry with function support
 *
 * @see https://vuepress.vuejs.org/theme/option-api.html
 */
export type Theme<T extends ThemeConfig = ThemeConfig> =
  | ThemeEntry
  | ((themeConfig: T, ctx: Context<T, Config<T>>) => ThemeEntry);
