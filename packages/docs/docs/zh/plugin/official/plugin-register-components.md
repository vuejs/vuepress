---
title: register-components
metaTitle: 注册组件的插件 | VuePress
---

# [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-register-components)

> register-components plugin for VuePress

## 安装

```bash
yarn add -D @vuepress/plugin-register-components
# OR npm install -D @vuepress/plugin-register-components
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/register-components']
}
```

## 选项

### componentsDir

- 类型: `Array | String`
- 默认值: `[]`

在这个目录下的所有组件将会被注册为全局组件，组件的命名将遵循在 [.vuepress/components](https://vuepress.vuejs.org/guide/using-vue.html#using-components) 中找到的组件的命名。

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

- 类型: `{ name: string, path: string }`
- 默认值: `[]`

通过明确的名称和路径来注册组件。

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

- 类型: `(file: string) => string`
- 默认值: `file => file.replace(/\/|\\/g, '-')`

自定义 `componentsDir` 中注册的组件的名称。
