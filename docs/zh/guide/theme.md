# 主题

VuePress 主题为你提供了布局、样式和其他功能，帮助你专注于 Markdown 内容的写作。

VuePress 有一个开箱即用的默认主题，正使用在你当前正在浏览的文档网站上。默认主题为文档网站提供了基础且实用的功能，你可以前往 [默认主题配置参考](../reference/default-theme/config.md) 获取全部的配置列表。

然而，你可能觉得默认主题不够出色。或者你想要搭建一个其他类型的网站而不是文档，比如博客。此时，你可以尝试 [使用社区主题](#社区主题) 或者 [创建本地主题](#本地主题)。

## 社区主题

社区用户创建了很多主题，并将它们发布到了 [NPM](https://www.npmjs.com/search?q=keywords:vuepress-theme) 上。查看主题本身的文档可以获取更详细的指引。

一般而言，你需要在 [theme](../reference/config.md#theme) 配置项中设置你要使用的主题名称：

```js
module.exports = {
  theme: 'foo',
}
```

你可以使用主题名称或者它的简称：

|          主题名称          |         简称         |
|---------------------------|---------------------|
| `vuepress-theme-foo`      | `foo`               |
| `@org/vuepress-theme-bar` | `@org/bar`          |
| `@vuepress/theme-default` | `@vuepress/default` |

## 本地主题

如果你想要使用自己的自定义主题，但是又不想发布它，你可以创建一个本地主题。

首先，创建本地主题目录，一般是 `.vuepress/theme` ：

```
└─ docs
   ├─ .vuepress
   │  ├─ theme
   │  │  └─ index.js
   │  └─ config.js
   └─ README.md
```

然后，设置主题目录的绝对路径来使用它：

```js
module.exports = {
  theme: path.resolve(__dirname, './path/to/docs/.vuepress/theme'),
}
```

接下来，前往 [深入 > 开发主题](../advanced/theme.md) 学习如何开发你自己的主题。
