# vue-cli-plugin-vuepress

> The official vue-cli plugin for VuePress

## Usage

### With vue ui

- Run `vue ui` in a terminal.
- Choose an existing Vue project or create a new one 
- Go to the `Plugins` section
- Click the `Add plugin` button
- Search `@vuepress/vue-cli-plugin-vuepress`
- Install the plugin and answer questions

If you go to the `Tasks` section, you can see that you now have access to two new VuePress commands:

- docs:dev (Run your VuePress site in dev mode)
- docs:build (Build your VuePress site)

Those commands are available in your `package.json` in the `scripts` section.

To edit/bootstrap your VuePress configuration, go to the `Configuration` section and select VuePress.
Note that if you edit your VuePress config while it's running in dev mode, it will be live reloaded.

**⚠️ Some configurations are not covered by this ui plugin. Refer to the [official VuePress documentaion](https://vuepress.vuejs.org/) for advanced config ⚠️**

### With vue-cli

- Run `vue add @vuepress/vue-cli-plugin-vuepress` in a terminal:
- Answer questions

Run `yarn docs:dev` for dev mode or `yarn docs:build` to build your VuePress site.
See more details in the [official VuePress documentaion](https://vuepress.vuejs.org/).

## Local Development

### 1. Clone this repository

```
git clone https://github.com/vuepressjs/vue-cli-plugin-vuepress.git
cd vue-cli-plugin-vuepress
```

### 2. Install dependencies

```
yarn
```

### 3. Install plugin locally

Please refer to the official [vue-cli documentation](https://cli.vuejs.org/dev-guide/plugin-dev.html#installing-plugin-locally)
