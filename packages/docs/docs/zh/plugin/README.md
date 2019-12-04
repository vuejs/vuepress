# 插件

插件通常会为 VuePress 添加全局功能。插件的范围没有限制。你可以在 [Awesome VuePress](https://github.com/vuepressjs/awesome-vuepress#plugins) 中找到更多的插件。

## 样例

以下是几种比较常见的插件：

1. 拓展在编译期生成的页面元数据，如：[@vuepress/plugin-last-updated](./official/plugin-last-updated.md)；
2. 在编译前后生成额外的文件，如：[@vuepress/plugin-pwa](./official/plugin-pwa.md)；
3. 注入全局的 UI, 如：[@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. 拓展 CLI 的指令，如：[vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export)。

这里也有一个略微复杂的插件案例 [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com)，其使用了编译器的元数据来生成了一些动态模块，并在客户端使用 `enhanceAppFiles` 来初始化他们。

## 开箱即用

为了让项目尽可能地简洁，并非所有官方插件都会随着 VuePress 一同安装。以下是一些随着 VuePress 和默认主题一同安装的插件，**没有出现在下表中的插件需要手动安装**（比如：[@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md)）。

### VuePress 自带的插件

- [@vuepress/plugin-last-updated](./official/plugin-last-updated.md)
- [@vuepress/plugin-register-components](./official/plugin-register-components.md)

### 默认主题自带的插件

- [@vuepress/plugin-active-header-links](./official/plugin-active-header-links.md)
- [@vuepress/plugin-nprogress](./official/plugin-nprogress.md)
- [@vuepress/plugin-search](./official/plugin-search.md)
- [vuepress-plugin-container](https://vuepress.github.io/zh/plugins/container/)
- [vuepress-plugin-smooth-scroll](https://vuepress.github.io/zh/plugins/smooth-scroll/)

## 架构

整个插件系统的架构如下:

![Architecture of VuePress](/architecture.png)
