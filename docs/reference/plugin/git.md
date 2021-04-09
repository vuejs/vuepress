# git

> [@vuepress/plugin-git](https://www.npmjs.com/package/@vuepress/plugin-git)

This plugin will collect git information of your pages, including the created and updated time, the contributors, etc.

The [lastUpdated](../default-theme/config.md#lastupdated) and [contributors](../default-theme/config.md#contributors) of default theme is powered by this plugin.

This plugin is mainly used to develop themes. You won't need to use it directly in most cases.

## Git Repository

This plugin requires your project to be inside a [Git Repository](https://git-scm.com/book/en/Git-Basics-Getting-a-Git-Repository), so that it can collect information from the commit history.

You should ensure all commits are available when building your site. For example, CI workflows usually clone your repository with [--depth 1](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---depthltdepthgt) to avoid fetching all commits, so you should disable the behavior to make this plugin work properly in CI.

::: warning
This plugin will significantly slow down the speed of data preparation, especially when you have a lot of pages. You can consider disabling this plugin in `dev` mode to get better development experience.
:::

## Options

### createdTime

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page created time or not.

### updatedTime

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page updated time or not.

### contributors

- Type: `boolean`

- Default: `true`

- Details:

  Whether to collect page contributors or not.

## Page Data

This plugin will add a `git` field to page data.

After using this plugin, you can get the collected git information in page data:

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

- Type: `number`

- Details:

  Unix timestamp in milliseconds of the first commit of the page.

### git.updatedTime

- Type: `number`

- Details:

  Unix timestamp in milliseconds of the last commit of the page.

### git.contributors

- Type: `GitContributor[]`

```ts
interface GitContributor {
  name: string
  email: string
  commits: number
}
```

- Details:

  The contributors information of the page.
