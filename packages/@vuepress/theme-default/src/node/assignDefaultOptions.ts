import type { DefaultThemeOptions, DefaultThemeLocales } from '../../types'

const defaultLocales: Required<DefaultThemeLocales> = {
  tip: 'TIP',
  warning: 'WARNING',
  danger: 'WARNING',
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: 'Take me home',
}

export const assignDefaultOptions = (options: DefaultThemeOptions): void => {
  if (!options.locales) {
    options.locales = {}
  }

  if (!options.locales['/']) {
    options.locales['/'] = {}
  }

  Object.assign(options.locales['/'], defaultLocales, options.locales['/'])
}
