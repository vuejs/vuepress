# 添加额外页面

有时你可能希望在不创建 Markdown 文件的情况下添加一些额外的页面。

我们可以借助于 [插件 API](../../reference/plugin-api.md) 和 [Node API](../../reference/node-api.md) 来轻松实现。

## 添加默认的主页

作为一个主题作者，你可能不想要求用户必须创建一个 `/README.md` 文件来作为主页，但是你希望提供一个默认的主页：

```ts
import { createPage } from '@vuepress/core';

export default {
  // 初始化之后，所有的页面已经加载完毕
  async onInitialized(app) {
    // 如果主页不存在
    if (app.pages.every((page) => page.path !== '/')) {
      // 创建一个主页
      const homepage = await createPage(app, {
        path: '/',
        // 设置 frontmatter
        frontmatter: {
          layout: 'Layout',
        },
        // 设置 markdown 内容
        content: `\
# 欢迎来到 ${app.options.title}

这是默认主页
`,
      })
      // 把它添加到 `app.pages`
      app.pages.push(homepage)
    }
  }
};
```
