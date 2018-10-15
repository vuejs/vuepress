# 术语

## 用户端

|      名称      |                               描述                               |
|:--------------|:----------------------------------------------------------------|
| `permalink`   | 当前页面最终使用的 URL，即 `$page.path` 的值                          |
| `regularPath` | 当前页面基于目录结构生成的 URL，即 `$page.regularPath` 的值             |
| `frontmatter` | 当前页面的 `markdown` 文件中包裹在 `---` 中的配置，用于做一些页面级别的配置 |
| `headers`     | 即 `markdown` 中那些以一个或多个 `#` 定义的标题                        |
| `siteConfig`  | 即 `.vuepress/config.js`                                        |
| `themeConfig` | 即 `.vuepress/config.js` 中 `themeConfig` 的值                    |

## 主题端

| 名称              | 描述                                |
|:-----------------|:-----------------------------------|
| `themePath`      | 当前使用的主题的根路径（绝对路径）         |
| `themeEntryFile` | 主题的配置文件 (`themePath/index.js`) |
