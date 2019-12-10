---
sidebar: auto
---

# FAQ

## 为什么不能把 `palette.styl` 和 `index.styl` 合并到一个 API?

`palete.styl` 负责全局颜色设置。在编译期间，主题颜色常量应该首先由预处理器解析，然后应用于全局上下文。

但对于 `index.styl`，它的工作是重写应用的默认样式。根据 CSS 的优先级原则，后一种样式具有更高的优先级，因此应该在 CSS 文件的末尾生成。

描述 stylus 编译器编译顺序的简单图表如下：

@flowstart
stage1=>operation: palette.styl
stage2=>operation: 默认 app 样式
stage3=>operation: index.styl

stage1->stage2->stage3
@flowend

<br>

## `clientDynamicModules` 和 `enhanceAppFiles` 的区别是什么?

让我们先来回顾一下，`clientDynamicModules` 和 `enhanceAppFiles` 都可以在编译期间通过动态 JavaScript 代码生成模块。

不同之处在于，当应用在客户端初始化时，`enhanceAppFiles` 生成的文件会自动加载和使用；而 `clientDynamicModules` 生成的文件则需要用户自己引入 `@dynamic/xxx`。

```js
module.exports = (options, ctx) => ({
  // 被入口文件自动引入
  enhanceAppFiles: {
    name: 'constans-a',
    content: `...`
  },

  // 需要引入 '@dynamic/constans-b' 后使用
  clientDynamicModules() {
    return {
      name: 'constans-b',
      content: `...`
    }
  }
})
```

## 什么时候需要使用 `enhanceAppFiles`?

1. 当你需要在客户端自动执行一些代码时；
2. 当你不需要复用这个模块时。

**比如：**

- [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components/index.js#L24)：在客户端自动注册组件
- [@vuepress/plugin-pagination](https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/plugin-pagination/index.js#L14)：自动注入 Vue 插件来拓展客户端 API

## 什么时候需要使用 `clientDynamicModules`?

1. 当你需要生成一个在特定时间被调用的动态模块时；
2. 当你需要复用这个模块。

**比如：**

- [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-plugin-blog/blob/master/src/index.ts#L167)：使用编译期元数据生成一些博客相关的动态模块并通过 `enhanceAppFiles` 将他们在客户端初始化

