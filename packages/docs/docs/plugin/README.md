# Plugin

Plugins generally add global-level functionality to VuePress. There is no strictly defined scope for a plugin. You can find out more plugins at [Awesome VuePress](https://github.com/vuepressjs/awesome-vuepress#plugins).

## Examples

There are typically several types of plugins:

1. Extend the page’s metadata generated at compile time. For example [@vuepress/plugin-last-updated](./official/plugin-last-updated.md);
2. Generate extra files before or after compilation. For example [@vuepress/plugin-pwa](./official/plugin-pwa.md);
3. Inject global UI. For example [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md);
4. Extend the CLI with custom commands. For example [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export).

Here is also a little slightly complicated plugin example [@vuepress/plugin-blog](https://vuepress-plugin-blog.ulivz.com) that uses compile-time metadata to generate some dynamic modules and initialize them on the client-side by using `enhanceAppFiles`.

## Out of the Box

To keep things at a minimum, not all of the official plugins are shipped with VuePress. Here is the list of plugins that are pre-installed in the VuePress and the default theme, **plugins that are not in the list below need to be installed manually**(e.g. [@vuepress/plugin-back-to-top](./official/plugin-back-to-top.md)).

### Plugins that come with VuePress

- [@vuepress/plugin-last-updated](./official/plugin-last-updated.md)
- [@vuepress/plugin-register-components](./official/plugin-register-components.md)

### Plugins that come with the default theme

- [@vuepress/plugin-active-header-links](./official/plugin-active-header-links.md)
- [@vuepress/plugin-nprogress](./official/plugin-nprogress.md)
- [@vuepress/plugin-search](./official/plugin-search.md)
- [vuepress-plugin-container](https://vuepress.github.io/plugins/container/)
- [vuepress-plugin-smooth-scroll](https://vuepress.github.io/plugins/smooth-scroll/)

## Architecture

The architecture of the whole plugin system is as follows:

![Architecture of VuePress](/architecture.png)
