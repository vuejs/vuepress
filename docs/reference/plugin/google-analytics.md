# google-analytics

<NpmBadge package="@vuepress/plugin-google-analytics" />

Integrate [Google Analytics](https://analytics.google.com/) into VuePress.

This plugin will import [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs) for [Google Analytics 4](https://support.google.com/analytics/answer/10089681).

## Reporting Events

Google Analytics will [automatically collect some events](https://support.google.com/analytics/answer/9234069), such as `page_view`, `first_visit`, etc.

So if you only want to collect some basic data of your site, you don't need to do anything else except setting the [Measurement ID](#id) correctly.

After using this plugin, the global `gtag()` function is available on the `window` object, and you can use it for [custom events reporting](https://developers.google.com/analytics/devguides/collection/ga4/events).

## Options

### id

- Type: `string`

- Details:

  The Measurement ID of Google Analytics 4, which should start with `'G-'`.

  You can follow the instructions [here](https://support.google.com/analytics/answer/9539598) to find your Measurement ID. Notice the difference between Google Analytics 4 Measurement ID (i.e. "G-" ID) and Universal Analytics Tracking ID (i.e. "UA-" ID).

- Example:

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
