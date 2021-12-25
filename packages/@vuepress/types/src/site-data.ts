import { Page } from "./context";
import { ThemeConfig } from "./theme";
import { Locales } from "./locale";
import { HeadTags } from "./config";

export interface SiteData<T extends ThemeConfig = ThemeConfig> {
  title: string;
  description: string;
  base: string;
  pages: Page[];
  headTags: HeadTags;
  themeConfig: T;
  locales: Locales;
}
