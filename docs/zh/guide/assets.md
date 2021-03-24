# 静态资源

## 相对路径

你可以在你的 Markdown 内容中使用相对路径来引用静态资源：

```md
![图片](./image.png)
```

一般情况下，我们推荐你使用这种方式来引用图片，因为人们通常会把图片放在引用它的 Markdown 文件附近。

## Public 文件

你可以把一些静态资源放在 Public 目录中，它们会被复制到最终生成的网站的根目录下。

默认的 Public 目录是  `.vuepress/public` ，可以通过配置来修改。

在下列这些情况中，你可能会用到它：

- 你可能需要提供一些静态资源，但是它们并不直接被你的 Markdown 文件引用，比如 favicon 和 PWA 图标。
- 你可能想要托管一些共享的静态资源，甚至可能需要在你的网站外部引用它，比如 Logo 图片。
- 你可能想在你的 Markdown 内容中通过绝对路径来引入图片。

以我们文档的源文件为例，我们把 VuePress 的 Logo 放在了 Public 目录下：

```bash
└─ docs
   ├─ .vuepress
   |  └─ public
   |     └─ images
   |        └─ hero.png  # <- Logo 文件
   └─ guide
      └─ assets.md       # <- 我们在这里
```

我们可以这样在当前页面引用 Logo ：

**Input**

```md
![VuePress Logo](/images/hero.png)
```

**Output**

![VuePress Logo](/images/hero.png)

::: tip
配置参考： [public](../reference/config.md#public)
:::

### Base Helper

如果你的网站部署在非根路径下，即 [base](../reference/config.md#base) 不是 `"/"` ，你需要把 `base` 添加到 Public 文件的绝对路径前。

举例来说，如果你想要把网站部署到 `https://foo.github.io/bar/` ，那么应该把 `base` 设置为 `"/bar/"` ，此时你必须在 Markdown 文件中这样引用 Public 文件：

```md
![VuePress Logo](/bar/images/hero.png)
```

显然，一旦某一天你修改了 `base`，这样的路径引用将会显得异常脆弱。这也是我们推荐你使用相对路径来引用静态文件的原因。

为了解决这个问题，VuePress 提供了内置的一个 Helper `$withBase` ，它可以帮助你生成正确的路径：

```md
<img :src="$withBase('/images/hero.png')" alt="VuePress Logo">
```

在 Markdown 中使用这个 Helper 会显得有些冗长，因此它可能对主题和插件作者更有帮助。

::: tip
配置参考： [base](../reference/config.md#base)
:::

## 依赖包和路径别名

尽管这不是常见用法，但是你可以从依赖包中引用图片：

```bash
npm install -D package-name
```

```md
![来自依赖包的图片](package-name/image.png)
```

在配置文件中设置的路径别名也同样支持：

```js
module.exports = {
  alias: {
    '@alias': path.resolve(__dirname, './path/to/some/dir'),
  },
}
```

```md
![来自路径别名的图片](@alias/image.png)
```

::: tip
配置参考： [alias](../reference/config.md#alias)
:::
