import { computed } from 'vue'
import { routeLocaleSymbol } from '@vuepress/client'
import type { ClientAppEnhance } from '@vuepress/client'
import {
  useThemeData,
  resolveThemeLocaleData,
  themeLocaleDataSymbol,
} from './composables'

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  // provide theme data & theme locale data
  const themeData = useThemeData()
  const routeLocale =
    app._context.provides[(routeLocaleSymbol as unknown) as string]
  const themeLocaleData = computed(() =>
    resolveThemeLocaleData(themeData.value, routeLocale.value)
  )
  app.provide(themeLocaleDataSymbol, themeLocaleData)

  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData.value
      },
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value
      },
    },
  })
}

export default clientAppEnhance
