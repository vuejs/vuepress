# TypeScript as Config <Badge text="1.9.0+" />

## Overview

VuePress supports type prompt and type checking for config file, as well as type prompt for default theme or custom theme.

![](/assets/1.9-overview.png)

## Quick Start

Creating `.vuepress/config.ts` with following contents:

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig({
  // ...
});
```

## Type Inferences for Theme

By default, `defineConfig` helper leverages the theme config type from default theme:

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

If you use a custom theme, you can use the `defineConfig4CustomTheme` helper with ability to pass generic type for your theme:

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

## Type Inferences for Official Plugins

You’ll be able to enjoy the type prompt of the official plugins:

![](/assets/1.9-official-plugin-tuple-usage.png)

Options of the official plugins certainly have type prompts, **Both [Tuple Style](../plugin/using-a-plugin.md#plugin-options), [Object Style](../plugin/using-a-plugin.md#plugin-options), and [Plugin Shorthand](../plugin/using-a-plugin.md#plugin-shorthand) support type inference!**:

- Tuple Style:

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

- Object Style:

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

The illustration snapshot is omitted here, you can try it yourself.

## Third Plugins

It is worth noting that third-party plugins do not support [Plugin Shorthand](../plugin/using-a-plugin.md#plugin-shorthand) if you’re using [Tuple Style](../plugin/using-a-plugin.md#plugin-options) to write your config, this is because from the perspective of the type system, the unknown shortcut is equivalent to `string`, which results in the failure of type inference.

By default, only officially maintained and plugins under [VuePress Community](https://vuepress-community.netlify.app/en/) support shortcut, feel free to submit pull request to add your plugin at this [file](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/types/lib/third-party-plugins.ts).

## ISO Language Code

Type inference supports [ISO Language Code](http://www.lingoes.net/en/translator/langcode.htm) for [i18n](http://localhost:8080/guide/i18n.html).

![](/assets/1.9-lang.png)

## Context API

VuePress’s configuration can also be a function, while its first parameter is the current [app context](../plugin/context-api.md#context-api):

```ts
import { defineConfig } from "vuepress/config";

export default defineConfig(ctx => ({
  // do not execute babel compilation under development
  evergreen: ctx.isProd
}));
```
