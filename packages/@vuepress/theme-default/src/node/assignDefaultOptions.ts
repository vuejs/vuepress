import type { DefaultThemeOptions, DefaultThemeLocaleData } from '../types'

const defaultLocaleData: DefaultThemeLocaleData = {
  home: '/',

  // navbar
  navbar: [],
  logo: null,
  repo: null,
  repoLabel: '',
  selectLanguageName: 'English',
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',

  // sidebar
  sidebar: 'auto',

  // edit link
  editLink: true,
  editLinkText: 'Edit this page',

  // custom block
  tip: 'TIP',
  warning: 'WARNING',
  danger: 'WARNING',

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',

  // `<OutboundLink>` sr-only
  openInNewWindow: 'open in new window',
}

export const assignDefaultOptions = (options: DefaultThemeOptions): void => {
  if (!options.locales) {
    options.locales = {}
  }

  if (!options.locales['/']) {
    options.locales['/'] = {}
  }

  Object.assign(options, {
    ...defaultLocaleData,
    ...options,
  })
}
