# 永久链接

## 背景

在 1.x.x 版本之前，VuePress 会检索文档源目录下的所有 markdown 文件并按照文件的层次结构去定义页面链接。
比如你有以下的文件结构：

```
├── package.json
└── source
    ├── _post
    │   └── intro-vuepress.md
    ├── index.md
    └── tags.md
```

那么你就会获得以下的可用页面：

```
/source/
/source/tags.html
/source/_post/intro-vuepress.html
```

看起来我们已经发现了 blog 的阴暗面。让我们继续看下去。

## 永久链接

一个永久链接是一个旨在未来很多年里维持不变的 URL，由此产生一个发生链接失效（link rot<sup>[1][1]</sup>）的可能性较小的超链接。VuePress 支持一种灵活的方式去生成固定链接，这种方式允许你使用各种模板变量。

默认的永久链接是`/:regular`。

### 配置永久链接

你可以使用全局配置来向所有页面应用永久链接：

```js
// .vuepress/config.js
module.exports = {
  permalink: "/:year/:month/:day/:slug"
};
```

另外，你也可以只为单独一个页面去设置永久链接。这种方式比全局配置拥有更高的优先级。

📝 **hello.md**:

```markdown
---
title: Hello World
permalink: /hello-world
---

Hello!
```

### 模板变量

| 变量 | 介绍 |
| --- | --- |
| :year | 文章发布的年份 (4数字) |
| :month | 文章发布的月份 (2数字) |
| :i_month | 文章发布的月份 (前面不带0) |
| :day | 文章发布的日份 (2数字) |
| :i_day | 文章发布的日份 (前面不带0) |
| :slug | 蛞蝓化文件路径 (不带扩展名) |
| :regular | VuePress默认的生成永久链接的方式，具体实现看 [这里][2] |

[1]:https://en.wikipedia.org/wiki/Link_rot
[2]:https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/shared-utils/src/fileToPath.ts
