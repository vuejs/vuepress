# Markdown

<NpmBadge package="@vuepress/theme-default" />

## 自定义容器

- 使用：

  ```md
  ::: <type> [title]
  [content]
  :::
  ```

  `type` 是必需的， `title` 和 `content` 是可选的。

  支持的 `type` 有：
    - `tip`
    - `warning`
    - `danger`
    - `details`
    - [CodeGroup](./components.md#codegroup) 和 [CodeGroupItem](./components.md#codegroupitem) 的别名：
      - `code-group`
      - `code-group-item`

- 示例 1 （默认标题）：

**输入**

```md
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签，在 IE / Edge 中不生效
:::
```

**输出**

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签，在 IE / Edge 中不生效
:::

- 示例 2 （自定义标题）：

**输入**

````md
::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::
````

**输出**

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::

- 示例 3 （Code Group 别名）：

**输入**

````md
:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
````

**输出**

:::: code-group
::: code-group-item FOO
```js
const foo = 'foo'
```
:::
::: code-group-item BAR
```js
const bar = 'bar'
```
:::
::::
