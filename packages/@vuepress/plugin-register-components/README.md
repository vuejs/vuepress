# @vuepress/plugin-register-components

> register-components plugin for vuepress

## Plugin Options

### componentsDir

- Type: `Array | String`
- Default: `[]`

All components in this directory will be registered as global components, naming of components will follow the components found in [.vuepress/components](https://vuepress.vuejs.org/guide/using-vue.html#using-components).

- Usage:

``` js
module.exports = {
  plugins: [
    [ 
      'register-components', 
      {
        componentDir: somepath
      }
    ]
  ] 
}
```

### components

- Type: `{ name: string, path: string }`
- Default: `[]`

Register global components by explicit name and path.

- Usage:

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