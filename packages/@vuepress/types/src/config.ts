import { PostCssLoaderOptions } from "./style";
import { MarkdownConfig } from "./markdown";
import { Locales } from "./locale";
import { ThemeConfig } from "./theme";
import { UserPlugins } from "./plugin";
import { Context } from "./context";
import { ChainWebpack } from "./shared";


/**
 * HTML tag name
 */
export type HTMLTagName = keyof HTMLElementTagNameMap;

/**
 * Expose `HeadTags`
 */
export type HeadTags = Array<
[
  HTMLTagName,
  Partial<HTMLElementTagNameMap[HTMLTagName]>,
  string? /* innerHTML */
]
>;

/**
 * Expose `VuePress` config.
 */
export interface Config<T extends ThemeConfig> {
  /**
   * Base URL
   *
   * @default '/'
   * @see https://vuepress.vuejs.org/config/#base
   */
  base?: `/${string}/`;
  /**
   * Title for the site
   *
   * @see https://vuepress.vuejs.org/config/#title
   */
  title?: string;
  /**
   * Description for the site.
   *
   * @see https://vuepress.vuejs.org/config/#description
   */
  description?: string;
  /**
   * Extra tags to inject into the page HTML <head>
   *
   * @see https://vuepress.vuejs.org/config/#head
   */
  head?: HeadTags;
  /**
   * Specify the host to use for the dev server.
   *
   * @see https://vuepress.vuejs.org/config/#host
   */
  host?: string;
  /**
   * Specify the port to use for the dev server.
   *
   * @see https://vuepress.vuejs.org/config/#port
   */
  port?: number;
  /**
   * Specify the temporary directory for client.
   *
   * @default '/path/to/@vuepress/core/.temp'
   * @see https://vuepress.vuejs.org/config/#temp
   */
  temp?: number;
  /**
   * Specify the output directory for `vuepress build`.
   *
   * @default '.vuepress/dist'
   * @see https://vuepress.vuejs.org/config/#dest
   */
  dest?: string;
  /**
   * Specify locales for i18n support.
   *
   * @see https://vuepress.vuejs.org/config/#locales
   */
  locales?: Locales;
  /**
   * A function to control what files should have <link rel="prefetch"> resource hints generated.
   *
   * @default '() => true'
   * @see https://vuepress.vuejs.org/config/#shouldprefetch
   */
  shouldPrefetch?: (
    file: string,
    type: "script" | "style" | "font" | "image"
  ) => boolean;
  /**
   * You can use this option to specify the path to the cache.
   *
   * @default 'true'
   * @see https://vuepress.vuejs.org/config/#cache
   */
  cache?: string | boolean;
  /**
   * Specify extra files to watch.
   *
   * @see https://vuepress.vuejs.org/config/#extrawatchfiles
   */
  extraWatchFiles?: string[];
  /**
   * Specify which pattern of files you want to be resolved.
   *
   * @see https://vuepress.vuejs.org/config/#patterns
   */
  patterns?: string[];
  /**
   * Specify this to use a custom theme.
   *
   * @see https://vuepress.vuejs.org/config/#theme
   */
  theme?: string;
  /**
   * Provide config options to the used theme.
   *
   * @see https://vuepress.vuejs.org/config/#themeconfig
   */
  themeConfig?: T;
  /**
   * Specify plugins.
   *
   * @see https://vuepress.vuejs.org/config/#plugins
   */
  plugins?: UserPlugins;
  /**
   * Markdown options.
   *
   * @see https://vuepress.vuejs.org/config/#markdown
   */
  markdown?: MarkdownConfig;
  /**
   * Options for postcss-loader 3.x
   *
   * @default { plugins: [require('autoprefixer')] }
   * @see https://vuepress.vuejs.org/config/#postcss
   */
  postcss?: PostCssLoaderOptions;
  /**
   * Options for stylus-loader
   *
   * @todo complete type, welcome pull request.
   * @default { preferPathResolver: 'webpack' }
   * @see https://vuepress.vuejs.org/config/#stylus
   */
  stylus?: Record<string, any>;
  /**
   * Options for sass-loader to load *.scss files.
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#scss
   */
  scss?: Record<string, any>;
  /**
   * Options for sass-loader to load *.sass files.
   *
   * @todo complete type, welcome pull request.
   * @default { indentedSyntax: true }
   * @see https://vuepress.vuejs.org/config/#sass
   */
  sass?: Record<string, any>;
  /**
   * Options for less-loader
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#less
   */
  less?: Record<string, any>;
  /**
   * Edit the internal webpack config.
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#configurewebpack
   */
  configureWebpack?: object | Function;
  /**
   * Edit the internal webpack config with webpack-chain.
   *
   * @see https://vuepress.vuejs.org/config/#chainwebpack
   */
  chainWebpack?: ChainWebpack;
  /**
   * Set to true if you are only targeting evergreen browsers.
   *
   * @see https://vuepress.vuejs.org/config/#evergreen
   */
  evergreen?: boolean;
}

/**
 * Expose `VuePress` config with function support
 */
export type UserConfig<T extends ThemeConfig> =
  | Config<T>
  | ((ctx: Context<T, Config<T>>) => Config<T>);