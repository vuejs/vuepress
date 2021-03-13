# Bundler

VuePress has been using [webpack](https://webpack.js.org/) as the bundler to dev and build sites. Since VuePress v2, other tools like [Vite](https://vitejs.dev/) are also supported.

Although it is possible to create other bundler packages by community users, currently we only suggest to use the bundlers provided by VuePress team.

## Webpack

When using the [vuepress](https://www.npmjs.com/package/vuepress) package, the webpack bundler is installed:

```sh
npm install -D vuepress
```

You can specify the name of the bundler to use in [bundler](../reference/config.md#bundler) option, or omit it because webpack is the default bundler. Then you can set [options of webpack bundler](../reference/bundler/webpack.md) via [bundlerConfig](../reference/config.md#bundlerconfig) option:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  bundler: '@vuepress/webpack',
  bundlerConfig: {
    // webpack bundler options
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions, WebpackBundlerOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions, WebpackBundlerOptions>({
  bundler: '@vuepress/webpack',
  bundlerConfig: {
    // webpack bundler options
  },
})
```

  </CodeGroupItem>
</CodeGroup>

## Vite

If you want to use Vite instead, you can switch to [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) package:

```sh
npm install -D vuepress-vite
```

Next, you need to specify the name of the bundler to use in [bundler](../reference/config.md#bundler) option. Then you can set [options of vite bundler](../reference/bundler/vite.md) via [bundlerConfig](../reference/config.md#bundlerconfig) option:

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  bundler: '@vuepress/vite',
  bundlerConfig: {
    // vite bundler options
  },
}
```

  </CodeGroupItem>

  <CodeGroupItem title="TS">

```ts
import { defineUserConfig } from 'vuepress-vite'
import type { DefaultThemeOptions, ViteBundlerOptions } from 'vuepress-vite'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  bundler: '@vuepress/vite',
  bundlerConfig: {
    // vite bundler options
  },
})
```

  </CodeGroupItem>
</CodeGroup>
