# Plugin

Plugins generally add global-level functionality to VuePress. There is no strictly defined scope for a plugin - there are typically several types of plugins:

1. Extend the page’s metadata generated at compile time. For example [@vuepress/plugin-last-updated](./official/plugin-last-updated.md);
2. Generate extra files before or after compilation. For example [@vuepress/plugin-pwa](./official/plugin-pwa.md);
3. Inject global UI. For example [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. Extend the CLI with custom commands. For example [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export).

Here is also a little slightly complicated plugin example [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com) that uses compile-time metadata to generate some dynamic modules and initialize them on the client-side by using `enhanceAppFiles`.

The architecture of the whole plugin system is as follows:

![Architecture of VuePress](/architecture.png)
