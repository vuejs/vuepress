# Plugin

Plugins usually add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins:

1. Extend the data generated at compile time. e.g. [@vuepress/plugin-last-updated](./official/plugin-last-updated.md).
2. Generate extra files before or after compilation. e.g. [@vuepress/plugin-pwa](./official/plugin-pwa.md).
3. Add extra pages. e.g. [@vuepress/plugin-i18n-ui](./official/plugin-i18n-ui.md).
4. Inject global UI. e.g. [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md).

![Architecture of VuePress](/architecture.png)
