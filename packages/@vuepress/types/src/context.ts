import { ThemeConfig } from "./theme";
import { Config } from "./config";
import { Lang } from "./lang";
import { SiteData } from "./site-data";

/**
 * Page instance.
 *
 * @todo distinguish public api and private api.
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/Page.js
 */
export interface Page<
  T extends ThemeConfig = ThemeConfig,
  C extends Config<T> = Config<ThemeConfig>
> {
  /**
   * file's absolute path
   */
  _filePath: string;
  /**
   * Access the client global computed mixins at build time, e.g _computed.$localePath.
   */
  _computed: Readonly<{
    $site: C;
    $themeConfig: T;
    $frontmatter: Record<string, unknown>;
    $localeConfig: Record<string, unknown>;
    $siteTitle: string;
    $canonicalUrl: string;
    $title: string;
    $description: string;
    $lang: Lang;
    $localePath: string;
    $themeLocaleConfig: Record<string, unknown>;
    $page: Page;
  }>;
  /**
   * Page file's raw content string
   */
  _content: string;
  /**
   * Page file's content string without frontmatter
   */
  _strippedContent: string;
  /**
   * Page's unique hash key
   */
  key: string;
  /**
   * Page's frontmatter object
   */
  frontmatter: Record<string, unknown>;
  /**
   * Current page's default link (follow the file hierarchy)
   */
  regularPath: string;
  /**
   * Current page's real link (use regularPath when permalink does not exist)
   */
  path: string;
  /**
   * Page's title
   */
  title: string;
  /**
   * Page's relative path
   */
  relativePath: string;
  /**
   * Page's permalink
   */
  permalink: string;
  /**
   * Name of page's parent directory.
   */
  dirname: string;
  /**
   * file name of page's source markdown file, or the last cut of regularPath.
   */
  filename: string;
  /**
   * slugified file name.
   */
  slug: string;
  /**
   * stripped file name.
   */
  strippedFilename: string;
  /**
   * date of current page.
   */
  date: string;
}

/**
 * Resolve theme.
 */
export interface ResolvedTheme {
  /**
   * Theme's directory
   */
  path: string;
  /**
   * Theme's full name
   */
  name: string;
  /**
   * Theme's short name
   */
  shortcut: string;
  /**
   * Theme entry path.
   */
  entry: string;
}

export interface LayoutComponent {
  filename: string;
  componentName: string;
  path: string;
  isInternal: string;
}

/**
 * Theme API.
 */
export interface ThemeAPI {
  theme: ResolvedTheme;
  parentTheme: ResolvedTheme;
  existsParentTheme: boolean;
  componentMap: Record<string, any>;
  layoutComponentMap: Record<string, LayoutComponent>;
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
  pages: Array<Page<T, C>>;
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
  /**
   * Theme API.
   */
  themeAPI: ThemeAPI;
  /**
   * Get site data.
   */
  getSiteData(): SiteData;
  /**
   * Get internal file path
   */
  getLibFilePath(string: string): string;
}
