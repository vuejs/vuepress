import { Lang } from "./lang";
/**
 * Local config.
 */
export interface LocaleConfig {
  /**
   * Locale's lang
   */
  lang: Lang;
  /**
   * Locale's title
   */
  title: string;
  /**
   * Locale's description
   */
  description: string;
}

export type Locales = { [path: string]: LocaleConfig };
