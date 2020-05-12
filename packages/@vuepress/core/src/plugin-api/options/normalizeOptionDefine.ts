import { isFunction } from '@vuepress/utils'
import { Options, OptionsNormalized } from './types'

export const normalizeOptionDefine = (
  define: Required<Options>['define']
): OptionsNormalized['define'] => (config) => {
  // resolve define object
  const defineValue = isFunction(define) ? define() : define

  // tap the arguments of DefinePlugin
  config.plugin('define').tap(([options]) => {
    Object.entries(defineValue).forEach(([key, value]) => {
      options[key] = JSON.stringify(value)
    })
    return [options]
  })
}
