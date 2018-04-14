# 配置

## 配置文件

如果没有任何配置，页面将会是非常小的，用户也无法浏览你的网站。为了自定义你的网站，让我们首先在你的文档目录下创建一个 `.vuepress` 目录，所以 VuePress 相关的文件将会被放在这里。

配置 VuePress 必要的文件是 `.vuepress/config.js`，它应该导出一个 JavaScript 对象。

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```

如果你运行起开发服务器，你应该能看到一个页面，它有一个 header，里面包含一个标题和一个搜索框。VuePress 内置了标题搜索 —— 它自动为所有页面的标题、`h2` 和 `h3` 构建了一个简单的搜索索引。

参见 [配置](../../config/) 来查看所有可配置的选项。 


## 主题配置

一个 VuePress 应该负责整个网站的布局和交互细节。VuePress 自带了一个默认的主题（正是你现在再看的），它是为技术文档而设计的。同时，它提供了一些选项，让你可以去自定义 navbar、 sidebar 和 homepage 等，详情请参见 [默认主题配置](../../default-theme-config/) 。

如果你想去开发一个自定义主题，参见 [自定义主题](./custom-themes.md)。
