import type { AliasOptions } from 'vite'
import type { App } from '@vuepress/core'

export const resolveAlias = async ({
  app,
}: {
  app: App
}): Promise<AliasOptions> => {
  const alias: AliasOptions = {
    '@internal': app.dir.temp('internal'),
    '@temp': app.dir.temp(),
    '@source': app.dir.source(),
  }

  // plugin hook: alias
  const aliasResult = await app.pluginApi.hooks.alias.process(app)

  aliasResult.forEach((aliasObject) =>
    Object.entries(aliasObject).forEach(([key, value]) => {
      alias[key] = value
    })
  )

  return [
    ...Object.keys(alias).map((p) => ({
      find: p,
      replacement: alias[p],
    })),
    {
      find: /^vue$/,
      replacement: require.resolve(
        '@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'
      ),
    },
    {
      find: /^vue-router$/,
      replacement: require.resolve('vue-router/dist/vue-router.esm-bundler.js'),
    },
  ]
}
