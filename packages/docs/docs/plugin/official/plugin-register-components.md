---
title: register-components
metaTitle: Register Components Plugin | VuePress
---

# [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-register-components)

> register-components plugin for VuePress

## Install

```bash
yarn add -D @vuepress/plugin-register-components
# OR npm install -D @vuepress/plugin-register-components
```

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/register-components']
}
```

## Options

### componentsDir

- Type: `Array | String`
- Default: `[]`

All components in this directory will be registered as global components, naming of components will follow the components found in [.vuepress/components](https://vuepress.vuejs.org/guide/using-vue.html#using-components).

``` js
module.exports = {
  plugins: [
    [
      'register-components',
      {
        componentsDir: somepath
      }
    ]
  ]
}
```

### components

- Type: `{ name: string, path: string }`
- Default: `[]`

Register global components by explicit name and path.

``` js
module.exports = {
  plugins: [
    [
      'register-components',
      {
        components: [
          {
            name: 'V-Card',
            path: 'path/to/card.vue'
          }
        ]
      }
    ]
  ]
}
```

### getComponentName

- Type: `(file: string) => string`
- Default: `file => file.replace(/\/|\\/g, '-')`

Customize component names for files under `componentsDir`.
