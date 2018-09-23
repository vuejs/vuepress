# @vuepress/plugin-search

> header-based search plugin for vuepress

## Usage

1. Enable this plugin:

```js
// .vuepress/config.js or themedir/index.js

module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  // Tweak the default color via palette.
  palette: {
    $accentColor: '#b58900',
    $textColor: '#586e75',
    $borderColor: '#eaecef',
    $codeBgColor: '#282c34',
    $arrowBgColor: '#ccc'
  }
}
```

2. Using search component:

```vue
import SearchBox from '@SearchBox'
```

## Options

### searchMaxSuggestions

- Type: `number`
- Default: `true`

Set the maximum number of results for search
