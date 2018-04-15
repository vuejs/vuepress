# 在 Markdown 中 使用 Vue

## 浏览器的 API 访问限制

当你在开发一个 VuePress 应用时，由于所有的页面都是通过 Node.js 服务端渲染的，因此任意的 Vue 使用都应当遵循 [编写通用代码](https://ssr.vuejs.org/zh/universal.html) 的要求。简而言之，请确保只在 `beforeMounted` 或者 `mounted` 访问浏览器 / DOM 的 API。

如果你正在使用，或者测试一个对于 SSR 不怎么友好的组件（比如包含了自定义指令），你可以将他们包裹在内置的 `<ClientOnly>` 指令中：

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

请注意，这并不能解决在**导入**时，这些组件或者库不能访问浏览器 API 的问题 —— 为了使用上述假定的仅能运行在浏览器环境下的代码，你需要在合适的生命周期钩子中**动态导入**它们：

``` vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

## 模板语法

### 插值

每一个 Markdown 文件将首先被编译成 HTML，接着作为一个 Vue 组件传入 `vue-loader`，这意味着你可以在文本中使用 Vue 风格的插值：

**Input**

``` md
{{ 1 + 1 }}
```

**Output**

<pre><code>{{ 1 + 1 }}</code></pre>

### 指令

同样地，也可以使用指令:

**Input**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<pre><code><span v-for="i in 3">{{ i }} </span></code></pre>

### 访问网站以及页面的数据

编译后的组件没有任何的私有数据，也可以访问 [网站的元数据](./custom-themes.md#site-and-page-metadata)，举例来说：

**Input**

``` md
{{ $page }}
```

**Output**

``` json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

## Escaping

默认情况下，代码块将会默认地包裹在 `v-pre` 中，如果你想要在代码块或者文本中显示原始的大括号，或者一些 Vue 特定的语法，你需要使用自定义容器 `v-pre` 来包裹：

**Input**

``` md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Output**

::: v-pre
`{{ This will be displayed as-is }}`
:::

## 使用组件

所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件，如：

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      └─ OtherComponent.vue
```

你可以直接使用这些组件在任意的 Markdown 文件中（组件名是通过文件名取到的）：

``` md
<demo-1/>
<OtherComponent/>
```

<demo-1></demo-1>

<OtherComponent/>

::: warning IMPORTANT
请确保一个自定义组件的名字包含连接符或者是PascalCase，否则，它将会被视为一个内联元素，并被包裹在一个 `<p>` 标签中，这将会导致 HTML 渲染紊乱，因为 HTML 标准规定， `<p>` 标签中不允许放置任何块级元素。
:::

## 脚本和样式提升

有时，你可以只想在当前页面应用一些 JavaScript 或者 CSS，在这种情况下，你可以直接在 Markdown 文件中使用原生的 `<script>` 或者 `<style>` 标签，它们将会从编译后的 HTML 文件中提取出来，并以 `<script>` 和 `<style>` 块的形式注入到生成的 Vue 单文件组件中：

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>
