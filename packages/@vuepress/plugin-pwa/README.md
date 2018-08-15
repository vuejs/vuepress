# @vuepress/plugin-active-header-links

> active-header-links plugin for vuepress

## Usage

```javascript
module.exports = {
  plugins: ['@vuepress/pwa']
}
```

Same with:

```javascript
module.exports = {
  plugins: {
    '@vuepress/pwa': {
       serviceWorker: true
     }
  }
}
```

SW-Update popup:

```javascript
module.exports = {
  plugins: {
    '@vuepress/pwa': {
       serviceWorker: true,
       updatePopup: {
         message: "New content is available.",
         buttonText: "Refresh"
       }
     }
  }
}
```

i18n Support:

```javascript
module.exports = {
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        // It will don't depends on the VuePress i18n implementation
        '/': {
          message: "New content is available.",
          buttonText: "Refresh"
        },
        '/zh/': {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    }
  }
}
```
    