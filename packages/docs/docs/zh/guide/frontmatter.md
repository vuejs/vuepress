# Front Matter

任何包含 YAML front matter 的 Markdown 文件都将由 [gray-matter](https://github.com/jonschlinkert/gray-matter) 处理。front matter 必须是 markdown 文件中的第一部分，并且必须采用在三点划线之间书写的有效的 YAML。 这是一个基本的例子：

```markdown
---
title: Blogging Like a Hacker
lang: en-US
---
```

在这些三条虚线之间，你可以设置预定义变量（参见[下面](#预定义变量)），甚至可以创建自己的自定义变量。 然后，您可以使用 <code> [$frontmatter](global-computed.md#frontmatter)</code> 在页面的其余部分、以及所有的自定义和主题组件访问这些变量。

::: tip
在 VuePress 中，Front matter 是 **可选的**。
:::

## 其他格式的 Front Matter

除了 YAML 之外，VuePress 也支持 JSON 或者 [TOML](https://github.com/toml-lang/toml) 格式的 front matter。

JSON front matter 需要以花括号开头和结尾：

```
---
{
  "title": "Blogging Like a Hacker",
  "lang": "en-US"
}
---
```

TOML front matter 需要显式地标注为 TOML：

```
---toml
title = "Blogging Like a Hacker"
lang = "en-US"
---
```

## 预定义变量

### title

- 类型: `string`
- 默认值: `h1_title || siteConfig.title`

当前页面的标题。

### lang

- 类型: `string`
- 默认值: `en-US`

当前页面的语言。

### description

- 类型: `string`
- 默认值: `siteConfig.description`

当前页面的描述。

### layout

- 类型: `string`
- 默认值: `Layout`

设置当前页面的布局组件。

### permalink

- 类型: `string`
- 默认值: `siteConfig.permalink`

参考: [Permalinks](./permalinks.md).

### metaTitle

- 类型: `string`
- 默认值: <code>\`${page.title} | ${siteConfig.title}\`</code>

重写默认的 meta title。

### meta

- 类型: `array`
- 默认值: `undefined`

指定额外的要注入的 meta 标签：

``` yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

## 默认主题的预定义变量

### navbar

- 类型: `boolean`
- 默认值: `undefined`

参考: [默认值 Theme Config > Disable the Navbar](../theme/default-theme-config.md#禁用导航栏).

### sidebar

- 类型: `boolean|'auto'`
- 默认值: `undefined`

参考: [默认值 Theme Config > Sidebar](../theme/default-theme-config.md#侧边栏).

### prev

- 类型: `boolean|string`
- 默认值: `undefined`

参考: [默认值 Theme Config > Prev / Next Links](../theme/default-theme-config.md#上-下一篇链接).

### next

- 类型: `boolean|string`
- 默认值: `undefined`

参考: [默认值 Theme Config > Prev / Next Links](../theme/default-theme-config.md#上-下一篇链接).
