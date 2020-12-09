import type { LoaderContext } from '../../types.webpack'

/**
 * A webpack loader to handle SSR dependencies
 *
 * This loader will only take effect in server bundle
 * because we only replace `ssrRender` code
 *
 * But we still need to use this loader in client,
 * to ensure that the module `request` in client and
 * server bundle are the same
 */
export = function vuepressLoader(this: LoaderContext, source: string): string {
  // get `request` from loader context
  const { request } = this

  // add `request` to `ssrContext._registeredComponents` to handle SSR dependencies
  return source.replace(
    'script.ssrRender = ssrRender',
    `\
import { ssrContextKey } from 'vue'
script.ssrRender = (...args) => {
  const ssrContext = args[2].appContext.provides[ssrContextKey]
  ssrContext._registeredComponents.add(${JSON.stringify(request)})
  return ssrRender(...args)
}
`
  )
}
