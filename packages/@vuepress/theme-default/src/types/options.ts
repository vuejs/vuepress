import type { LocaleData, ThemeConfig } from '@vuepress/core'
import type { NavbarConfig, SidebarConfig } from './nav'

export type DefaultThemeOptions = ThemeConfig<DefaultThemeLocaleData>

export interface DefaultThemeLocaleData extends LocaleData {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string

  /**
   * Navbar config
   *
   * Set to `false` to disable navbar in current locale
   */
  navbar?: false | NavbarConfig

  /**
   * Navbar logo config
   *
   * Logo to display in navbar
   */
  logo?: null | string

  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: null | string

  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: string

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLanguageAriaLabel?: string

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string

  /**
   * Sidebar config
   *
   * Set to `false` to disable sidebar in current locale
   */
  sidebar?: 'auto' | false | SidebarConfig

  /**
   * Edit link config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean

  /**
   * Edit link config
   *
   * The text to replace the default "Edit this page"
   */
  editLinkText?: string

  /**
   * Edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string

  /**
   * Edit link config
   *
   * Set this config if the branch of your docs is not 'master'
   */
  docsBranch?: string

  /**
   * Edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string

  /**
   * Custom block config
   *
   * Default title of TIP custom block
   */
  tip?: string

  /**
   * Custom block config
   *
   * Default title of WARNING custom block
   */
  warning?: string

  /**
   * Custom block config
   *
   * Default title of DANGER custom block
   */
  danger?: string

  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[]

  /**
   * 404 page config
   *
   * Text of back-to-home link in 404 page
   */
  backToHome?: string

  /**
   * sr-only message in `<OutboundLink>`
   */
  openInNewWindow?: string
}
