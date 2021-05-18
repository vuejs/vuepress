# 打包工具

VuePress 一直以来都在使用 [webpack](https://webpack.js.org/) 作为打包工具来进行网站的开发和构建。从 VuePress v2 开始，也可以支持使用其他工具，如 [Vite](https://vitejs.dev/) 等。 

尽管社区用户也可以创建打包工具 Package ，但目前我们仅推荐使用由 VuePress 团队提供的打包工具。

## Webpack

在使用 [vuepress](https://www.npmjs.com/package/vuepress) Package 时，安装的是 webpack 打包工具：

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install -D vuepress@next
```

  </CodeGroupItem>
</CodeGroup>

你可以在 [bundler](../reference/config.md#bundler) 配置项中设置你要使用的打包工具名称，或者不设置它，因为在使用 `vuepress` Package 时， webpack 是默认的打包工具。此时你可以通过 [bundlerConfig](../reference/config.md#bundlerconfig) 配置项来设置 [webpack 打包工具的选项](../reference/bundler/webpack.md) ：

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  bundler: '@vuepress/webpack',
  bundlerConfig: {
    // webpack 打包工具的选项
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
    // webpack 打包工具的选项
  },
})
```

  </CodeGroupItem>
</CodeGroup>

## Vite

如果想要改为使用 Vite ，你可以切换成 [vuepress-vite](https://www.npmjs.com/package/vuepress-vite) Package ：

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress-vite@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install -D vuepress-vite@next
```

  </CodeGroupItem>
</CodeGroup>

你可以在 [bundler](../reference/config.md#bundler) 配置项中设置你要使用的打包工具名称，或者不设置它，因为在使用 `vuepress-vite` Package 时， vite 是默认的打包工具。此时你可以通过 [bundlerConfig](../reference/config.md#bundlerconfig) 配置项来设置 [vite 打包工具的选项](../reference/bundler/vite.md) ：

<CodeGroup>
  <CodeGroupItem title="JS" active>

```js
module.exports = {
  bundler: '@vuepress/vite',
  bundlerConfig: {
    // vite 打包工具的选项
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
    // vite 打包工具的选项
  },
})
```

  </CodeGroupItem>
</CodeGroup>
