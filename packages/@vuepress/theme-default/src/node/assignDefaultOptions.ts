import type { DefaultThemeOptions, DefaultThemeLocaleData } from '../../types'

const defaultRootConfig: DefaultThemeLocaleData = {
  logo: null,
  navbar: [],
  sidebar: 'auto',
  repo: null,
  repoLabel: '',
}

const defaultLocaleData: DefaultThemeLocaleData = {
  home: '/',

  // language selection
  selectLanguageName: 'English',
  selectLanguageText: 'Languages',
  selectLanguageAriaLabel: 'Select language',

  // custom block default title
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
    ...defaultRootConfig,
    ...options,
  })

  Object.assign(options.locales['/'], {
    ...defaultLocaleData,
    ...options.locales['/'],
  })
}
