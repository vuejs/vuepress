---
sidebar: auto
---

# 本地开发

## 摘要

如果你看到此处，你可能会对改进 VuePress 核心感兴趣。

VuePress 正在使用包含了 [Yarn Workspaces](https://yarnpkg.com/zh-Hans/docs/workspaces/) 和 [Lerna](https://github.com/lerna/lerna) 的一个组合。

## 初始化 package

```bash
 yarn bootstrap // 它将运行并安装根目录和所有 package 的依赖
```

`yarn bootstrap` 将使用 `hoist`。它对你意味着什么？

它将重组工作空间根目录中的所有依赖项并链接所有 package。

通过运行以下命令来检查链接：

```bash
    ls -la node_modules/@vuepress
```

你将全部链接完成。

::: warning
你必须注意应在子文件夹的 package.json 中声明所有依赖项。如果未声明 package 的 dependencies，则在发布到 npm 时将无法正常工作。
:::

::: warning
你应该留意一个特殊的 package `@vuepress/shared-utils`，它是由 Typescript 编写的。
:::

安装完所有依赖后，它将运行 `yarn tsc` 。该命令将告诉 workspace 的 `@vuepress/shared-utils` 来编译他的 js。

::: warning
从这里开始，如果你要在此 package 中进行更改，则必须始终运行 `yarn tsc` 或在单独的终端中运行 `yarn run tsc -w` 。当检测到 shared-utils 有任何更改时，它将重新运行 tsc。
:::

## 链接

从这里开始就很不错了，你已经准备就绪。你需要将 VuePress 链接到你的项目。

```bash
yarn register-vuepress
```

你将看到类似这样的内容：`success Registered "vuepress".`

它将链接来自 `packages/vuepress` 的 VuePress 包。 你将可以访问 VuePress 脚手架和其他内部的 packages，他们在 `packages/vuepress/package.json` 被声明。

```js
{
"main": "index.js",
///
"bin": {
    "vuepress": "cli.js"
  }
  ///
}
```

现在转到你的项目并运行 `yarn link vuepress`。

你应该得到 `success Using linked package for "vuepress".`

## 取消链接

你可能想要取消所有链接。在工作区根文件夹中，运行：

```bash
yarn unregister-vuepress
```

现在你可以在你的项目文件夹中运行 `yarn unlink vuepress` 。

如果一切运行正常，当你在你的项目文件夹中再次运行 `yarn link vuepress` ，你应该获得一个错误提示你找不到名为 vuepress 的软件包。

## BUGS / 问答

你可能会发现链接有些困难。如果你触发了一些类似 `There's already a package called "vuepress" registered` 之类的内容，你已经注册了 VuePress ：

- 如果你已经从[链接](#链接)链接了 VuePress ，就已经很好了。如果你进行更改，由于它是 symbolic link，你不必重新运行任何指令。只有当你更新 shared-utils 软件包时，才必须重新运行 `yarn tsc` ，仅此而已。
- 如果你什么也没做。那么你已经将 VuePress 链接到某处。你要做的就是删除你运行 `yarn link` 或 `yarn unlink` 的文件夹。

## 更多相关

你可以使用更多有趣的命令：

- `yarn packages:list` 将列出所有存在的 packages 及其版本 [更多](https://github.com/lerna/lerna/tree/master/commands/list#readme)
- `yarn packages:changed` 会告诉你哪些 packages 将受到下一个 lerna 的 发布/版本 的影响 [更多](https://github.com/lerna/lerna/tree/master/commands/changed#readme)
- `yarn packages:diff` 将显示上一个版本依赖所有差异 [更多](https://github.com/lerna/lerna/tree/master/commands/diff#readme)
