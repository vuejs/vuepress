/**
 * Create version of vuepress app
 */
export const createAppVersion = (): string => {
  return require('../../package.json').version
}
