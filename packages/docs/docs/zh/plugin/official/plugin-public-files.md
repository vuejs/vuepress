---
title: public-files
metaTitle: public files 插件 | VuePress
---

# [@vuepress/plugin-public-files](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-public-files)

> public files 插件

## 安装

```bash
yarn add -D @vuepress/plugin-public-files
# OR npm install -D @vuepress/plugin-public-files
```

## 使用

### 默认形式

```js
module.exports = {
  plugins: [
    // 会将所有 sourceDir 下的文件拷贝
    // 除了 .md 文件和 dotfiles
    "@vuepress/public-files"
  ]
};
```

### 文件或目录列表

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      [
        ".vuepress/another-public",
        ".vuepress/one-more-public",
        ".vuepress/public-file.txt"
      ]
    ]
  ]
};
```

### 对象形式的配置

参见：[https://github.com/webpack-contrib/copy-webpack-plugin#patterns](https://github.com/webpack-contrib/copy-webpack-plugin#patterns)

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      {
        from: "_assets", // 根据 sourceDir 解析
        to: "assets", // 根据 outDir 解析
        ignore: [
          /* 要忽略文件的 glob 模式 */
        ]
      }
    ]
  ]
};
```

::: tip
事实上我们支持设置一个字符串或对象组成的列表。
:::

### 多次使用

```js
module.exports = {
  plugins: [
    [
      "@vuepress/public-files",
      [".vuepress/another-public", ".vuepress/one-more-public"]
    ],
    [
      "@vuepress/public-files",
      {
        from: "_assets",
        to: "assets",
        ignore: [
          /* globs */
        ]
      }
    ]
  ]
};
```
