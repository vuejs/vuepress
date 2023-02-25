import { PluginConfig4ActiveHeadLinks } from "./official-plugins";

/**
 * Navbar link item.
 */
export interface NavItem {
  /**
   * Navigation link's text
   */
  text: string;
  /**
   * Navigation link
   */
  link?: string;
  /**
   * aria-label
   */
  ariaLabel?: string;
  /**
   * target rendered to `<a>`
   */
  target?: "_self" | "_blank";
  /**
   * render ref not not.
   */
  rel?: boolean;
  /**
   * children links
   */
  items?: Array<NavItem>;
}

/**
 * Navbar link item.
 */

/**
 * Sidebar item - string shortcut
 *
 * @example
 *
 *   sidebar: [
 *     '/',
 *     '/page-a',
 *   ]
 */
export type SidebarItem4ShortcutString = string;
/**
 * Sidebar item - tuple shortcut
 *
 * @example
 *
 *   sidebar: [
 *     ['/page-b', 'Explicit link text']
 *   ]
 */
export type SidebarItem4ShortcutTuple = [SidebarItem4ShortcutString, string];
/**
 * Sidebar item - Composite type for string and tuple shortcut
 */
export type SidebarItem4Shortcut =
  | SidebarItem4ShortcutString
  | SidebarItem4ShortcutTuple;
/**
 * Sidebar item - sidebar group
 */
export type SidebarItem4Group = {
  /**
   * Sidebar's title
   */
  title: string;
  /**
   * Sidebar's link, should be an absolute path and must exist
   */
  path?: string;
  /**
   * Whether current sidebar is collapsable
   */
  collapsable?: boolean;
  /**
   * Sidebar's depth.
   */
  sidebarDepth?: number;
  /**
   * By default the first subgroup is opened initially.
   * You can change this using the `initialOpenGroupIndex`:
   * Specify an index to open another subgroup or use `-1` for no open group.
   *
   * @default 0
   */
  initialOpenGroupIndex?: number;
  /**
   * Sidebar children.
   */
  children?: Array<SidebarItem4Shortcut | SidebarItem4Group>;
};

/**
 * Sidebar config with array.
 *
 * @see https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar-groups
 */
export type SidebarConfigArray = Array<
  SidebarItem4Shortcut | SidebarItem4Group
>;

/**
 * Multiple sidebar config
 *
 * @see https://vuepress.vuejs.org/theme/default-theme-config.html#multiple-sidebars
 */
export type SidebarConfig4Multiple = {
  [path: string]: SidebarConfigArray;
};

/**
 * Expose `DefaultThemeConfig`.
 */
export type DefaultThemeConfig = {
  /**
   * Navbar's log
   *
   * @see https://vuepress.vuejs.org/theme/default-theme-config.html#navbar-logo
   */
  logo?: string;
  /**
   * Navbar Links
   *
   * @see https://vuepress.vuejs.org/theme/default-theme-config.html#navbar-links
   */
  nav?: Array<NavItem>;
  /**
   * Set to false to disable the Navbar
   */
  navbar?: boolean;
  /**
   * Sidebar config.
   */
  sidebar?:
    | "auto" /* @see https://vuepress.vuejs.org/theme/default-theme-config.html#auto-sidebar-for-single-pages */
    | false /* @see https://vuepress.vuejs.org/theme/default-theme-config.html#disabling-the-sidebar */
    | SidebarConfigArray
    | SidebarConfig4Multiple;
  /**
   * Sidebar's depth, set to 0 to disable collapsable sidebar links.
   *
   * @default 1
   */
  sidebarDepth?: number;
  /**
   * Enable built-in search
   *
   * @default true
   */
  search?: boolean;
  /**
   * Customize how many suggestions will be shown
   */
  searchMaxSuggestions?: number;
  /**
   * Define a placeholder for the search box
   */
  searchPlaceholder?: string;
  /**
   * Algolia Search
   *
   * @see https://community.algolia.com/docsearch/
   */
  algolia?: {
    /**
     * Your Algolia Search API key.
     */
    apiKey?: string;
    /**
     * Your Algolia index name.
     */
    indexName?: string;
    /**
     * Your Algolia application ID.
     */
    appId?: string;
    /**
     * Forward search parameters to the Algolia API.
     *
     * @see https://docsearch.algolia.com/docs/legacy/behavior/#algoliaoptions
     */
    algoliaOptions?: Record<string, any>;
  } | null;
  /**
   * Display text for last updated.
   *
   * @default false
   * @see https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated
   */
  lastUpdated?: string | boolean;
  /**
   * Set it to false to hide next page links on all pages
   *
   * @default true
   */
  nextLinks?: false;
  /**
   * default value is true. Set it to false to hide prev page links on all pages
   *
   * @default true
   */
  prevLinks?: false;
  /**
   * Repository url, assumes GitHub, can also be a full GitLab url.
   *
   * @example 'vuejs/vuepress'
   */
  repo?: string;
  /**
   * Custom the header label
   *
   * @default "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
   */
  repoLabel?: string;

  /**
   * Following optional options are for generating "Edit this page" link
   */

  /**
   * if your docs are in a different repo from your main project.
   *
   * @example  'vuejs/vuepress'
   */
  docsRepo?: string;
  /**
   * Documentation directory, you can custom it if your docs are not at the root of the repo.
   *
   * @example docs
   */
  docsDir?: string;
  /**
   * if your docs are in a specific branch (defaults to 'master'):
   *
   * @default 'master'
   */
  docsBranch?: string;
  /**
   * Enable edit links at the footer.
   *
   * @default false
   */
  editLinks?: boolean;
  /**
   * Custom text for edit link.
   *
   * @default 'Edit this page'
   */
  editLinkText?: string;
  /**
   * Enable smooth scroll.
   *
   * @default false
   */
  smoothScroll?: boolean;
  /**
   * Locales config.
   */
  locales?: Record<string, Omit<DefaultThemeConfig, "locales">>;
  /**
   * Locale's label.
   */
  label?: string;
  /**
   * Locale's select text.
   */
  selectText?: string;
  /**
   * aria label
   */
  ariaLabel?: string;
  /**
   * Options for  @vuepress/plugin-active-header-links.
   */
  activeHeaderLinks?: boolean | PluginConfig4ActiveHeadLinks;
};
