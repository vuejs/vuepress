# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

将 [Google Analytics](https://analytics.google.com/) 集成到 VuePress 中。

该插件会通过引入 [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs) 来启用 [Google Analytics 4](https://support.google.com/analytics/answer/10089681) 。

## 上报事件

Google Analytics 会 [自动收集部分事件](https://support.google.com/analytics/answer/9234069) ，比如 `page_view`, `first_visit` 等。

因此，如果你只是想收集站点的一些基础数据，你只需要正确设置 [Measurement ID](#id) ，不需要再额外做其他事情。

在引入该插件之后，一个全局的 `gtag()` 函数会被挂载到 `window` 对象上，你可以使用它进行 [自定义事件的上报](https://developers.google.com/analytics/devguides/collection/ga4/events) 。

## 配置项

### id

- 类型： `string`

- 详情：

  Google Analytics 4 的 Measurement ID ，应以 `'G-'` 开头。

  你可以通过 [这里](https://support.google.com/analytics/answer/9539598) 的指引来找到你的 Measurement ID 。注意区分 Google Analytics 4 的 Measurement ID （即 "G-" 开头的 ID） 和 Universal Analytics 的 Tracking ID （即 "UA-" 开头的 ID）。

- 示例：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-XXXXXXXXXX',
      },
    ],
  ],
}
```
