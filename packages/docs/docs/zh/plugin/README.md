# 插件

插件通常会为 VuePress 添加全局功能。插件的范围没有限制——一般有下面几种：

1. 拓展在编译期生成的页面元数据，如：[@vuepress/plugin-last-updated](./official/plugin-last-updated.md)；
2. 在编译前后生成额外的文件，如：[@vuepress/plugin-pwa](./official/plugin-pwa.md)；
3. 注入全局的 UI, 如：[@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. 拓展 CLI 的指令，如 [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export)。

这里也有一个略微复杂的插件案例 [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com), 其使用了编译器的元数据来生成了一些动态模块，并在客户端使用 `enhanceAppFiles` 来初始化他们。

整个插件系统的架构如下:

![Architecture of VuePress](/architecture.png)
