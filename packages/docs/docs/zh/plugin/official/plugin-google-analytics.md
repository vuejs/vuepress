---
title: google-analytics
metaTitle: Google Analytics 插件 | VuePress
---

# [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-google-analytics)

> Google analytics 插件

## 安装

```bash
yarn add -D @vuepress/plugin-google-analytics@next
# OR npm install -D @vuepress/plugin-google-analytics@next
```

## 使用

```javascript
module.exports = {
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]  
  ] 
}
```

## 选项

### ga

- 类型: `string`
- 默认值: `undefined`

Google Analytics ID。
