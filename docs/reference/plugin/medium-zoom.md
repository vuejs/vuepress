# medium-zoom

<NpmBadge package="@vuepress/plugin-medium-zoom" />

Integrate [medium-zoom](https://github.com/francoischalifour/medium-zoom#readme) into VuePress, which can provide the ability to zoom images.

## Options

### selector

- Type: `string`

- Default: `':not(a) > img'`

- Details:

  Selector for zoomable images.

  By default this plugin will make all images zoomable except those inside `<a>` tags.

### delay

- Type: `number`

- Default: `500`

- Details:

  Delay in milliseconds.

  After navigating to a new page, this plugin will make images zoomable with a delay.

### zoomOptions

- Type: `Object`

- Details:

  Options for medium-zoom.

- Also see:
  - [medium-zoom > Options](https://github.com/francoischalifour/medium-zoom#options)

## Styles

You can customize most of the zoom styles via [zoomOptions](#zoomoptions), while this plugin also provides some CSS variables for additional customization:

```css
:root {
  /* z-index of the zoom overlay */
  --medium-zoom-z-index: 100;
}
```

## Composition API

### useMediumZoom

- Details:

  Returns the `Zoom` instance that used by this plugin, so that you can use the instance [methods](https://github.com/francoischalifour/medium-zoom#methods) directly.

  This plugin will make images zoomable after navigating to current page. But if you are going to add new images dynamically, you may need this method to make those new images zoomable, too.

  This plugin adds an extra `refresh` method on the `Zoom` instance, which will call `zoom.detach()` then `zoom.attach()` with the [selector](#selector) as the default parameter. It will help you to refresh the zoomable images for current page.

- Example:

```ts
import { nextTick } from 'vue'
import { useMediumZoom } from '@vuepress/plugin-medium-zoom/lib/client'

export default {
  setup() {
    const zoom = useMediumZoom()

    // ... do something to add new images in current page
  
    // then you may need to call `refresh` manually to make those new images zoomable
    nextTick(() => {
      zoom.refresh()
    })
  },
}
```
