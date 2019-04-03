# Plugin

Plugins usually add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins:

1. Extend the page's metadata generated at compile time. e.g. [@vuepress/plugin-last-updated](./official/plugin-last-updated.md);
2. Generate extra files before or after compilation. e.g. [@vuepress/plugin-pwa](./official/plugin-pwa.md);
3. Inject global UI. e.g. [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. Extend the CLI with custom commands. e.g. [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export).

![Architecture of VuePress](/architecture.png)
