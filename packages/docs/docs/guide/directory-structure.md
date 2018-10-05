# Directory Structure

## User Side

With following the principle of `Convention is superior to configuration`, the recommended document structure is as follows:

::: vue
.
├── docs
│   ├── .vuepress (_**Optional**_)
│   │   ├── `components` (_**Optional**_)
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

::: warning Note
Please note the capitalization of the directory name.
:::

- `docs/.vuepress`: It is used to store global configuration, components, static resources, etc.
- `docs/.vuepress/components`: The Vue components in this directory will be automatically registered as global components.
- `docs/.vuepress/theme`: Used to store local theme。
- `docs/.vuepress/style`: Stores style related files.
- `docs/.vuepress/style/index.styl`: Automatically imported global style files, generated at the end of the final file, have a higher priority than the default style.
- `docs/.vuepress/style/palette.styl`: The palette is used to override the default color constants and to set the color constants of Stylus.
- `docs/.vuepress/public`: Static resource directory.
- `docs/.vuepress/template`: Store HTML template files.
- `docs/.vuepress/template/dev.html`: HTML template file for development environment.
- `docs/.vuepress/template/ssr.html`: Vue SSR based HTML template file in the built time.
- `docs/.vuepress/config.js`: Entry file of configuration, can also be `yml` or `toml`.
- `docs/.vuepress/enhanceApp.js`: App level enhancement.

In addition, for the directory structure above, the default page routing address is as follows:

| Relative Path | Page Routing |
|---|---|
| `/README.md` | `/` |
| `/guide/README.md` | `/guide/` |
| `/config.md` | `/config.html` |

**Also see:** 

- [Theme]()
- [Config]()

