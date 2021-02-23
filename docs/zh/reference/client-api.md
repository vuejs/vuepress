# 客户端 API

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

### withBase

- 详情：

  在 URL 前添加站点 [base](./config.md#base) 前缀。

- 参考：
  - [指南 > 静态资源 > Base Helper](../guide/assets.md#base-helper)

## 类型

除了下列提到的类型 Helper 以外，我们同样提供了和上述 Composition API 相关的类型定义，如 `SiteData`, `PageData` 等。

### ClientAppSetup

- 详情：

  为 [clientAppSetupFiles](./plugin-api.md#clientappsetupfiles) 提供的类型 Helper 。

- 示例：

创建 `clientAppSetup.ts` 文件：

```ts
import type { ClientAppSetup } from '@vuepress/client'

const clientAppSetup: ClientAppSetup = () => {
  // ...
}

export default clientAppSetup
```

### ClientAppEnhance

- 详情：

  为 [clientAppEnhanceFiles](./plugin-api.md#clientappenhancefiles) 提供的类型 Helper 。

- 示例：

创建 `clientAppEnhance.ts` 文件：

```ts
import type { ClientAppEnhance } from '@vuepress/client'

const clientAppEnhance: ClientAppEnhance = ({ app, router, siteData }) => {
  // ...
}

export default clientAppEnhance
```
