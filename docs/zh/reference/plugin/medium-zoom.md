# medium-zoom

<NpmBadge package="@vuepress/plugin-medium-zoom" />

将 [medium-zoom](https://github.com/francoischalifour/medium-zoom#readme) 集成到 VuePress 中，为图片提供可缩放的功能。

## 配置项

### selector

- 类型： `string`

- 默认值： `':not(a) > img'`

- 详情：

  可缩放的图片的选择器。

  默认情况下，该插件会使 `<a>` 标签以外的所有图片都支持缩放。

### delay

- 类型： `number`

- 默认值： `500`

- 详情：

  以毫秒为单位的延迟。

  在切换路由进入一个新页面时，该插件会在一定延迟后才使页面内的图片支持缩放。

### zoomOptions

- 类型： `Object`

- 详情：

  medium-zoom 的配置项。

- 参考：
  - [medium-zoom > Options](https://github.com/francoischalifour/medium-zoom#options)

## 样式

你可以通过 [zoomOptions](#zoomoptions) 对大部分的缩放样式进行自定义，不过作为补充，该插件同样提供了一些 CSS 变量：

```css
:root {
  /* zoom 遮罩的 z-index */
  --medium-zoom-z-index: 100;
}
```

## Composition API

### useMediumZoom

- 详情：

  返回该插件使用的 `Zoom` 实例，便于你直接使用实例上的 [methods](https://github.com/francoischalifour/medium-zoom#methods) 。

  该插件会在切换路由进入当前页面时使图片支持缩放。但如果你要动态添加新图片，那么你可能就需要这个方法来让这些新图片也支持缩放。

  该插件在 `Zoom` 实例上额外添加了一个 `refresh` 方法，它将使用 [selector](#selector) 作为默认参数，先调用 `zoom.detach()` 再调用 `zoom.attach()` ，便于你快速刷新当前页面图片的缩放状态。

- 示例：

```ts
import { nextTick } from 'vue'
import { useMediumZoom } from '@vuepress/plugin-medium-zoom/lib/client'

export default {
  setup() {
    const zoom = useMediumZoom()

    // ... 进行了一些操作，在当前页面添加了新的图片

    // 此时你可能需要手动调用 `refresh` 来让这些新图片支持缩放
    nextTick(() => {
      zoom.refresh()
    })
  },
}
```
