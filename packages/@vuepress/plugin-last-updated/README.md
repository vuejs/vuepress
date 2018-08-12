# @vuepress/plugin-last-updated

> last-updated plugin for vuepress

> Note that this plugin has been included in the core.

## transformer

- Type: `function`
- Default: `undefined`

By default, this plugin produces a 13-bit timestamp for each page, you can also pass in a transformer to convert it to any format that you want.

``` javascript
const timeago = require("timeago.js");

module.exports = {
  plugins: [
    [ 
      'last-updated',
      { transformer: timeago.format }
    ]
  ]
}
```
