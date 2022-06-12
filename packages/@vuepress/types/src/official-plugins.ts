/**
 * Options for @vuepress/plugin-active-header-links
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-active-header-links.html
 */
export interface PluginConfig4ActiveHeadLinks {
  sidebarLinkSelector?: string;
  headerAnchorSelector?: string;
}

/**
 * Options for @vuepress/plugin-back-to-top
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-back-to-top.html
 */
export interface PluginConfig4BackToTop {}

/**
 * Options for @vuepress/plugin-blog
 *
 * @todo complete typings, contribution welcome
 * @see https://vuepress.vuejs.org/plugin/official/plugin-blog.html
 */
export interface PluginConfig4Blog {
  [k: string]: any;
}

/**
 * Options for @vuepress/plugin-google-analytics
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-blog.html
 */
export interface PluginConfig4GoogleAnalytics {
  /**
   * Provide the Google Analytics ID to enable integration.
   */
  ga: string;
}

/**
 * Options for @vuepress/plugin-last-updated
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-last-updated.html
 */
export interface PluginConfig4LastUpdated {
  /**
   * By default, this plugin produces a 13-bit timestamp for each page,
   * you can also pass in a transformer to convert it to any format that you want.
   */
  transformer?: (timestamp: number, lang: string) => string;
  /**
   * You can also pass in an options object to customize the timestamp output
   */
  dateOptions?: Intl.DateTimeFormatOptions;
}

/**
 * Options for @vuepress/plugin-medium-zoom
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-medium-zoom.html
 */
export interface PluginConfig4MediumZoom {
  /**
   * Image selector
   *
   * @default '.theme-default-content :not(a) > img'
   */
  selector?: string;
  /**
   * Options for medium-zoom.
   *
   * @see https://github.com/francoischalifour/medium-zoom
   */
  options?: Record<string, any>;
}

/**
 * Options for @vuepress/plugin-nprogress
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-nprogress.html
 */
export interface PluginConfig4Nprogress {}

/**
 * Options for @vuepress/plugin-pwa
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-pwa.html
 */
export interface PluginConfig4PWA {
  /**
   * If set to true, VuePress will automatically generate and register a service worker
   * that caches the content for offline use (only enabled in production).
   *
   * @default true
   */
  serviceWorker?: boolean;
  /**
   * Config of workbox-build generateSW.
   *
   * @see https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
   */
  generateSWConfig?: Record<string, any>;
  /**
   * A custom component to replace the default popup component.
   *
   * @see https://vuepress.vuejs.org/plugin/official/plugin-pwa.html#customize-the-ui-of-sw-update-popup
   */
  popupComponent?: string;
  /**
   * Enable update popup
   */
  updatePopup?: boolean;
}

/**
 * Options for @vuepress/plugin-register-components
 *
 * @see https://vuepress.vuejs.org/plugin/official/plugin-register-components.html
 */
export interface PluginConfig4RegisterComponents {
  /**
   * All components in this directory will be registered as global components.
   */
  componentsDir?: string[] | string;
  /**
   * Register global components by explicit name and path.
   */
  components?: { name: string; path: string };
  /**
   * Customize component names for files under componentsDir.
   *
   * @default file => file.replace(/\/|\\/g, '-')
   */
  getComponentName?: (file: string) => string;
}

export interface PluginConfigMap {
  '@vuepress/plugin-active-header-links': PluginConfig4ActiveHeadLinks;
  '@vuepress/plugin-back-to-top': PluginConfig4BackToTop;
  '@vuepress/plugin-blog': PluginConfig4Blog;
  '@vuepress/plugin-google-analytics': PluginConfig4GoogleAnalytics;
  '@vuepress/plugin-last-updated': PluginConfig4LastUpdated;
  '@vuepress/plugin-medium-zoom': PluginConfig4MediumZoom;
  '@vuepress/plugin-nprogress': PluginConfig4Nprogress;
  '@vuepress/plugin-pwa': PluginConfig4PWA;
  '@vuepress/plugin-register-components': PluginConfig4RegisterComponents;
}
