import { ThemeConfig } from "./theme";
import { Config } from "./config";

/**
 * Page instance.
 *
 * @todo distinguish public api and private api.
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/Page.js
 */
export interface Page {
  path: string;
  title: string;
  content: string;
  filePath: string;
  relative: string;
  permalink: string;
  frontmatter: string;
  dirname: string;
  filename: string;
  slug: string;
  strippedFilename: string;
  date: string;
}

/**
 * Context API
 *
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */
export interface Context<
T extends ThemeConfig = ThemeConfig,
C extends Config<T> = Config<ThemeConfig>
> {
  /**
   * Whether VuePress run in production environment mode.
   */
  isProd: boolean;
  /**
   * A list of Page objects
   */
  pages: Page[];
  /**
   * Root directory where the documents are located.
   */
  sourceDir: string;
  /**
   * Root directory where the temporary files are located.
   */
  tempPath: string;
  /**
   * Output path.
   */
  outDir: string;
  /**
   * i.e. base at config
   */
  base: string;
  /**
   * A utility for writing temporary files to tempPath.
   */
  writeTemp(filename: string, content: string): Promise<void>;
  /**
   * Current theme config.
   */
  themeConfig: T;
  /**
   * VuePress Config.
   */
  siteConfig: C;
}
