import { Context, Config, ThemeConfig, DefaultThemeConfig } from '@vuepress/types'

export * from '@vuepress/types'

export type UserConfig<T extends ThemeConfig> =
  | Config<T>
  | ((ctx: Context) => Config<T>);

/**
 * Helper for type prompt and type checking.
 */
export function defineConfig(config: UserConfig<DefaultThemeConfig>): void;
export function defineConfig4CustomTheme<T extends ThemeConfig = ThemeConfig>(
  config: UserConfig<T>
): void;
