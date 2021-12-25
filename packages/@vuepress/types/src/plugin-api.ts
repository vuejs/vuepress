import { Application } from "express";
import WebpackDevServer from "webpack-dev-server";
import { UserPlugins, PluginOptions } from "./plugin";
import { ChainWebpack, Hook, AsyncHook, PluginObject } from "./shared";
import { Page, Context } from "./context";
import { ExtendMarkdown } from "./markdown";
import { ThemeConfig } from "./theme";
import { Config } from "./config";

export type PlainObjectWithStringValue = Record<string, string>;

/**
 * Plugin Life Cycle
 */
export type LifeCycleHook$Ready = AsyncHook<[], unknown>;
export type LifeCycleHook$Updated = Hook<[], unknown>;
export type LifeCycleHook$Generated = Hook<[], unknown>;

export type FileDescriptor = { name: string; content: string };

/**
 * Plugin Options API
 */
export type PluginEntryOptions = {
  /**
   * Current name
   */
  name: string;
  /**
   * Specify whether current plugin can be applied multiple times.
   */
  multiple?: boolean;
  /**
   * Sub plugins
   */
  plugins?: UserPlugins;
  /**
   * Edit the internal webpack config with webpack-chain.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#chainwebpack
   */
  chainWebpack?: ChainWebpack;
  /**
   * Specify define
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#define
   */
  define?: PlainObjectWithStringValue | Hook<[], PlainObjectWithStringValue>;
  /**
   * Specify alias
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#alias
   */
  alias?: PlainObjectWithStringValue;
  /**
   * Equivalent to `before` in `webpack-dev-server`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#beforedevserver
   */
  beforeDevServer?: Hook<[Application, WebpackDevServer], unknown>;
  /**
   * Equivalent to `after` in `webpack-dev-server`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#afterdevserver
   */
  afterDevServer?: Hook<[Application, WebpackDevServer], unknown>;
  /**
   * A function to edit default config or apply extra plugins to the `markdown-it` instance.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown
   */
  extendMarkdown?: ExtendMarkdown;
  /**
   * Edit the internal Markdown config with `markdown-it-chain`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown
   */
  chainMarkdown?: Hook<[], unknown>;
  /**
   * This option accepts absolute file path(s) pointing to the enhancement file(s).
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#enhanceappfiles
   */
  enhanceAppFiles?:
    | string
    | string[]
    | Hook<[], FileDescriptor | FileDescriptor[]>
    | AsyncHook<[], FileDescriptor | FileDescriptor[]>;
  /**
   * Generate some client modules at compile time.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
   */
  clientDynamicModules?: AsyncHook<[], FileDescriptor | FileDescriptor[]>;
  /**
   * A function used to extend or edit the $page object
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
   */
  extendPageData?: <T extends PluginObject = PluginObject>(
    page: Page & T
  ) => void;
  /**
   * A path to the mixin file which allows you to control the lifecycle of root component.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#clientrootmixin
   */
  clientRootMixin?: string;
  /**
   * Add extra pages pointing to a Markdown file:
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#additionalpages
   */
  additionalPages?:
    | Array<{ path: string; filePath: string }>
    | AsyncHook<
        [],
        Array<{
          path: string;
          content: string;
          frontmatter: Record<string, any>;
        }>
      >;
  /**
   * Define global ui components fixed somewhere on the page.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#globaluicomponents
   */
  globalUIComponents?: string | string[];
  /**
   * Register a extra command to enhance the CLI of VuePress.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendcli
   */
  extendCli?: Function;
};

/**
 * Export type of plugin entry
 *
 * @see https://vuepress.vuejs.org/plugin/writing-a-plugin.html
 */
export type PluginEntry = PluginEntryOptions & {
  /**
   * The ready hook is executed after the application is initialized.
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#ready
   */
  ready?: AsyncHook<[], unknown>;
  /**
   * Trigger when a new compilation is triggered
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#updated
   */
  updated?: Hook<[], unknown>;
  /**
   * Called when a (production) build finishes, with an array of generated page HTML paths.
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#generated
   */
  generated?: AsyncHook<[string[]], unknown>;
};

/**
 * Export type of plugin entry with function support
 *
 * @see https://vuepress.vuejs.org/plugin/writing-a-plugin.html
 */
export type Plugin<
  T extends PluginOptions = PluginOptions,
  U extends ThemeConfig = ThemeConfig
> = PluginEntry | ((options: T, ctx: Context<U, Config<U>>) => PluginEntry);