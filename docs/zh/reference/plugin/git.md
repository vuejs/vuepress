# git

> [@vuepress/plugin-git](https://www.npmjs.com/package/@vuepress/plugin-git)

该插件会收集你的页面的 Git 信息，包括创建和更新时间、贡献者等。

默认主题的 [lastUpdated](../default-theme/config.md#lastupdated) 和 [contributors](../default-theme/config.md#contributors) 就是由该插件支持的。

该插件主要用于开发主题，大部分情况下你不需要直接使用它。

## Git 仓库

该插件要求你的项目在 [Git 仓库](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository) 下，这样它才能从提交历史记录中收集信息。

在构建站点时，你应该确保所有的提交记录是可以获取到的。举例来说， CI 工作流通常会在克隆你的仓库时添加 [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) 参数来避免拉取全部的提交记录，因此你需要禁用这个功能，以便该插件在 CI 可以中正常使用。

::: warning
该插件会显著降低准备数据的速度，特别是在你的页面数量很多的时候。你可以考虑在 `dev` 模式下禁用该插件来获取更好的开发体验。
:::

## 配置项

### createdTime

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否收集页面的创建时间。

### updatedTime

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否收集页面的更新时间。

### contributors

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否收集页面的贡献者。

## 页面数据

该插件会向页面数据中添加一个 `git` 字段。

在使用该插件后，可以在页面数据中获取该插件收集到的 Git 信息：

```ts
import { usePageData } from '@vuepress/client'
import type { GitPluginPageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData<GitPluginPageData>()
    console.log(page.value.git)
  }
}
```

### git.createdTime

- 类型： `number`

- 详情：

  页面第一次提交的 Unix 毫秒时间戳。

### git.updatedTime

- 类型： `number`

- 详情：

  页面最后一次提交的 Unix 毫秒时间戳。

### git.contributors

- 类型： `GitContributor[]`

```ts
interface GitContributor {
  name: string
  email: string
  commits: number
}
```

- 详情：

  页面的贡献者信息。
