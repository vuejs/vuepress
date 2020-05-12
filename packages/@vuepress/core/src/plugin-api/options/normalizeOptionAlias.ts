import { isFunction } from '@vuepress/utils'
import { Options, OptionsNormalized } from './types'

export const normalizeOptionAlias = (
  alias: Required<Options>['alias']
): OptionsNormalized['alias'] => (config) => {
  // resolve alias object
  const aliasValue = isFunction(alias) ? alias() : alias

  // set aliases
  Object.entries(aliasValue).forEach(([key, value]) => {
    config.resolve.alias.set(key, value)
  })
}
