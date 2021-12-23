import MarkdownIt from "markdown-it";
import { Hook } from "./shared";

export type ExtendMarkdown = Hook<[MarkdownIt], unknown>;

/**
 * Markdown config.
 */
export interface MarkdownConfig {
  /**
   * Whether to show line numbers to the left of each code blocks.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-linenumbers
   */
  lineNumbers?: boolean;
  /**
   * Function for transforming header texts into slugs.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-slugify
   */
  slugify?: (str: string) => string;
  /**
   * Options for markdown-it-anchor
   *
   * @default { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }
   * @see https://vuepress.vuejs.org/config/#markdown-anchor
   */
  anchor?: {
    /**
     * @deprecated please using "markdown.slugify"
     */
    slugify?: (str: string) => string;
    /**
     * @default true
     */
    permalink?: boolean;
    /**
     * @default true
     */
    permalinkBefore?: boolean;
    /**
     * @default '#'
     */
    permalinkSymbol?: string;
  };
  /**
   * Option to customize internal links to be compatible when using the
   * [vuepress-plugin-clean-urls](https://vuepress-community.netlify.app/en/plugins/clean-urls/)
   *
   * @default '.html'
   * @see https://vuepress.vuejs.org/config/#markdown-pagesuffix
   */
  pageSuffix?: string;
  /**
   * The key and value pair will be added to <a> tags that point to an external link.
   *
   * @default { target: '_blank', rel: 'noopener noreferrer' }
   * @see https://vuepress.vuejs.org/config/#markdown-externallinks
   */
  externalLinks?: boolean;
  /**
   * Options for [markdown-it-table-of-contents](https://github.com/cmaas/markdown-it-table-of-contents).
   *
   * @see https://vuepress.vuejs.org/config/#markdown-toc
   */
  toc?: {
    includeLevel?: number[];
    [key: string]: any;
  };
  /**
   * You can install any markdown-it plugins through markdown.plugins option.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-plugins
   */
  plugins?: Array<string | [string, Record<string, any>]>;
  /**
   * A function to edit default config or apply extra plugins to the [markdown-it](https://github.com/markdown-it/markdown-it)
   *  instance used to render source files.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-extendmarkdown
   */
  extendMarkdown?: ExtendMarkdown;
  /**
   * @see https://vuepress.vuejs.org/config/#markdown-extractheaders
   */
  extractHeaders?: Array<"h2" | "h3" | "h4" | "h5" | "h6">;
}
