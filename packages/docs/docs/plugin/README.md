# Plugin

Plugins usually add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins:

1. Extend the data generated at compile time. e.g. [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-last-updated).
2. Generate extra files before or after compilation. e.g. [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)
3. Add extra pages. e.g. [@vuepress/plugin-i18n-ui](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-i18n-ui)
4. Inject global UI. e.g. [@vuepress/plugin-back-to-top](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-back-to-top).

![Architecture of VuePress](/architecture.png)
