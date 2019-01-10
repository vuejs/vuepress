---
title: google-analytics
metaTitle: Google Analytics Plugin | VuePress
---

# [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-google-analytics)


> Google analytics plugin

## Install

```bash
yarn add -D @vuepress/plugin-google-analytics
# OR npm install -D @vuepress/plugin-google-analytics
```

## Usage

```javascript
module.exports = {
  plugins: [
    '@vuepress/google-analytics',
    {
      'ga': '' // UA-00000000-0
    }
  ] 
}
```

## Options

### ga

- Type: `string`
- Default: `undefined`

Provide the Google Analytics ID to enable integration.
