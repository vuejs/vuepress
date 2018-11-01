# 插件

插件通常会为 VuePress 添加全局功能。插件的范围没有限制——一般有下面几种：

1. 拓展在编译期生成的数据，如：[@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated).
2. 在编译前后生成额外的文件，如：[@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)
3. 增加额外的页面，如：[@vuepress/plugin-i18n-ui](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-i18n-ui)
4. 注入全局的 UI, 如：[@vuepress/plugin-back-to-top](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-back-to-top).

![Architecture of VuePress](/architecture.png)
