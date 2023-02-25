# TypeScript 配置 <Badge text="1.9.0+" />

## 概述

VuePress 支持配置文件的类型提示和类型检查，以及默认主题或自定义主题的类型提示。

![](/assets/1.9-overview.png)

## 快速开始

创建 `.vuepress/config.ts`，内容如下:

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig({
  // ...
});
```

## 主题的类型推断

默认情况下，`defineConfig` 帮助程序使用默认主题的配置类型：

```js
import { defineConfig } from "vuepress/config";

export default defineConfig({
  /**
   * Type is `DefaultThemeConfig`
   */
  themeConfig: {
    repo: "vuejs/vuepress",
    editLinks: true,
    docsDir: "packages/docs/docs"
  }
});
```

如果你使用自定义主题，可以使用  `defineConfig4CustomTheme`帮助器，为你的主题传递通用类型：

```ts
import { defineConfig4CustomTheme } from "vuepress/config";

interface MyThemeConfig {
  hello: string;
}

export default defineConfig4CustomTheme<MyThemeConfig>({
  /**
   * Type is `MyThemeConfig`
   */
  themeConfig: {
    hello: "vuepress"
  }
});
```

## 官方插件的类型推断

你可以享受官方插件的类型提示：

![](/assets/1.9-official-plugin-tuple-usage.png)

官方插件的选项有确定的类型提示，** [元组样式](../plugin/using-a-plugin.md#plugin-options), [对象样式](../plugin/using-a-plugin.md#plugin-options), 和 [插件速记](../plugin/using-a-plugin.md#plugin-shorthand) 都支持类型推断!**:

- 元组样式:

![](/assets/1.9-official-plugin-options.png)

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig({
  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true
      }
    ]
  ]
});
```

- 对象样式:

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig({
  plugins: {
    "@vuepress/pwa": {
      serviceWorker: true
    }
  }
});
```

这里省略了插图快照，您可以自己尝试。

## 第三方插件

值得注意的是，如果你使用 [元组样式](../plugin/using-a-plugin.md#plugin-options) 配置，第三方插件可能不支持 [插件速记](../plugin/using-a-plugin.md#plugin-shorthand) 。这是因为从类型系统的角度来看，未知的快捷方式相当于 `string`，导致类型推断失败。

默认情况下，只有官方维护和 [VuePress 社区](https://vuepress-community.netlify.app/en/) 下的插件支持快捷方式，请随时提交拉取请求，以在此[文件](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/types/lib/third-party-plugins.ts)中添加您的插件。

## ISO 语言代码

类型推断支持 [i18n](http://localhost:8080/guide/i18n.html) 的 [ISO 语言代码](http://www.lingoes.net/en/translator/langcode.htm) 。

![](/assets/1.9-lang.png)

## 上下文 API

VuePress 的配置也可以是一个函数，它的第一个参数是当前的 [APP 上下文](../plugin/context-api.md#context-api):

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig(ctx => ({
  // do not execute babel compilation under development
  evergreen: ctx.isProd
}));
```

