# 目录结构

## 用户视角

VuePress 遵循 "约定优于于配置" 的原则，推荐的文档结构如下：

::: vue
.
├── docs
│   ├── .vuepress (_**Optional**_)
│   │   ├── `components` (_**Optional**_)
│   │   ├── `layouts` (_**Optional**_)
│   │   │   └── xxx.vue
│   │   ├── `theme` (_**Optional**_)
│   │   │   └── Layout.vue
│   │   ├── `public` (_**Optional**_)
│   │   ├── `styles` (_**Optional**_)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── `emplates` (_**Optional，Danger Zone**_)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── `config.js` (_**Optional**_)
│   │   └── `enhanceApp.js` (_**Optional**_)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
:::

::: warning 注意
请留意目录名称的大小写。
:::



如上，由 VuePress 约定的目录：

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录下的 Vue 组件会被自动注册为全局组件。
- `docs/.vuepress/layouts`: 该目录下的 Vue 组件会被自动注册为布局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/style`: 存放样式相关的文件。
- `docs/.vuepress/style/index.styl`: 自动被导入的全局样式文件，生成在最终文件的末尾，具有比默认样式更高的优先级。
- `docs/.vuepress/style/palette.styl`: 调色板，用于覆盖默认的颜色常量，以及设定 Stylus 的颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/template`: 存放 HTML 模板文件。
- `docs/.vuepress/template/dev.html`: 开发环境的 HTML 模板文件。
- `docs/.vuepress/template/ssr.html`: 基于 Vue SSR 的构建阶段的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置入口文件，也可以是 `yml` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 应用级别的配置。

此外，对于上述的目录结构，默认情况下，生成的页面路由地址如下：

| 相对路径 | 页面路由 |
|---|---|
| `/README.md` | `/` |
| `/guide/README.md` | `/guide/` |
| `/config.md` | `/config.html` |

**Also see:** 

- [Theme]()
- [Config]()

## 主题视角

一个约定的主题目录结构和用户目录相似，它是这样的：

::: vue
theme
├── `components` (_**Optional**_)
│   └── xxx.vue
├── `layouts`
│   ├── Layout.vue (_**Required**_)
│   └── 404.vue (_**Optional**_)
├── `styles` (_**Optional**_)
│   ├── index.styl
│   └── palette.styl
├── `templates` (_**Optional**_)
│   ├── dev.html
│   └── ssr.html
├── `index.js` (_**Optional**_)
└── package.json
:::

- `theme/components`: 主题的组件，不会被自动注册为全局组件，主题开发者可借助 `@vuepress/plugin-register-components` 来决定是否注册为全局组件。
- `theme/layouts`: 主题的布局组件，其中 `Layout.vue` 为必需项。
- `theme/style`: 同上。
- `theme/template`: 同上。
- `theme/index.js`: 主题配置的入口文件。


一些要点：

1. 用户的 `palette.styl` 比主题的 `palette.styl` 优先级更高，因此，主题可以定义自己的调色板，同时用户又可以调节它。
2. 用户的 `index.styl` 和主题的 `index.styl` 都会被生成到最终的 `CSS` 文件中，但是用户的样式会生成得更晚，因此具有更高的优先级。
2. 对于模板，以 `ssr.html` 为例，若用户的 `ssr.html` 不存在，则降级到主题的 `ssr.html`，若主题的 `ssr.html` 也不存在，则降级到默认的 `ssr.html`。

::: warning Note
在自定义 `ssr.html` 或 `dev.html` 时，最好在默认的[模板文件](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/app/index.dev.html)的基础上来修改，否则可能导致构建失败。
:::
