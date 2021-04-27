# 客户端 API

<NpmBadge package="@vuepress/client" />

客户端 API 是由 [@vuepress/client](https://www.npmjs.com/package/@vuepress/client) Package 提供的，用于开发客户端文件。

## Composition API

### useSiteData

- 详情：

  返回站点数据的 Ref 对象。

### useSiteLocaleData

- 详情：

  返回当前 locale 的站点数据的 Ref 对象。

  当前 locale 中的配置已经合并到顶层配置中。

### useRouteLocale

- 详情：

  返回当前路由对应的 locale path 的 Ref 对象。

  它的值是 [locales](./config.md#locales) 配置的键之一。

### usePageData

- 详情：

  返回当前页面数据的 Ref 对象。

### usePageFrontmatter

- 详情：

  返回当前页面 Frontmatter 的 Ref 对象。

  它的值是页面数据的 `frontmatter` 属性。

### usePageHead

- 详情：

  返回当前页面 Head 配置的 Ref 对象。

  它的值是合并 [head](./frontmatter.md#head) Frontmatter 和 [head](./config.md#head) 配置，并进行去重后得到的。

### usePageHeadTitle

- 详情：

  返回当前页面 Head 中的标题的 Ref 对象。

  它的值是连接页面标题和站点标题后得到的。

### usePageLang

- 详情：

  返回当前页面语言的 Ref 对象。

  它的值是页面数据的 `lang` 属性。

## 工具函数

### defineClientAppEnhance

- 详情：

  帮助你创建 [clientAppEnhanceFiles](./plugin-api.md#clientappenhancefiles) 的工具函数。

- 示例：

创建 `clientAppEnhance.ts` 文件：

```ts
import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
})
```

- 参考：
  - [Cookbook > Client App Enhance 的使用方法](../advanced/cookbook/usage-of-client-app-enhance.md)

### defineClientAppSetup

- 详情：

  帮助你创建 [clientAppSetupFiles](./plugin-api.md#clientappsetupfiles) 的工具函数。

- 示例：

创建 `clientAppSetup.ts` 文件：

```ts
import { defineClientAppSetup } from '@vuepress/client'

export default defineClientAppSetup(() => {
  // ...
})
```

### withBase

- 详情：

  在 URL 前添加站点 [base](./config.md#base) 前缀。

- 参考：
  - [指南 > 静态资源 > Base Helper](../guide/assets.md#base-helper)


## 常量

在客户端代码中有一些常量可以使用。

如果想要把这些常量的类型定义补充到你的代码环境中，请将 `@vuepress/client/types` 添加到你的 `tsconfig.json` 里：

```json
{
  "compilerOptions": {
    "types": ["@vuepress/client/types"]
  }
}
```

### `__VERSION__`

- 类型： `string`

- 详情：

  VuePress Core 的版本号。

### `__DEV__`

- 类型： `boolean`

- 详情：

  一个环境标记，用于标识当前是否运行在 `dev` 模式下。

### `__SSR__`

- 类型： `boolean`

- 详情：

  一个环境标记，用于标识当前是否运行在服务端渲染 (SSR) 环境下。
