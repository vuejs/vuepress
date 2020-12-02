import { isPlainObject } from '@vuepress/shared'

/**
 * Check if a module is esm with `export default`
 */
export const hasExportDefault = <T = any>(
  mod: unknown
): mod is { default: T } =>
  isPlainObject(mod) &&
  !!mod.__esModule &&
  Object.prototype.hasOwnProperty.call(mod, 'default')
