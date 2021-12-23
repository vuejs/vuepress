import {
  UserConfig,
  ThemeConfig,
  PluginOptions,
  DefaultThemeConfig,
  Theme,
  Plugin,
} from './lib'

export * from './lib'

/**
 * A helper function to define VuePress config file.
 *
 * @see https://vuepress.vuejs.org/config/
 */
export function defineConfig(config: UserConfig<DefaultThemeConfig>): void;

/**
 * A helper function to define VuePress config file, for custom theme.
 *
 * @see https://vuepress.vuejs.org/config/
 */
export function defineConfig4CustomTheme<T extends ThemeConfig = ThemeConfig>(
  config: UserConfig<T>
): void;

/**
 * A helper function to define VuePress theme entry file.
 *
 * @see https://vuepress.vuejs.org/theme/option-api.html
 */
export function defineTheme<T extends ThemeConfig = ThemeConfig>(config: Theme<T>): void;

/**
 * A helper function to define VuePress theme entry file.
 *
 * @see https://vuepress.vuejs.org/plugin/writing-a-plugin.html
 */
export function definePlugin<T extends PluginOptions = PluginOptions>(config: Plugin<T>): void;
