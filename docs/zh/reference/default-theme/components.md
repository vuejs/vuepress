# 内置组件

<NpmBadge package="@vuepress/theme-default" />

## Badge <Badge text="badge" />

- Props:
  - type
    - 类型： `'tip' | 'warning' | 'danger'`
    - 默认值： `'tip'`
  - text
    - 类型： `string`
    - 默认值： `''`
  - vertical
    - 类型： `'top' | 'middle' | 'bottom' | undefined`
    - 默认值： `undefined`

- 示例：

**输入**

```md
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
```

**输出**

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />

## CodeGroup

- 详情：

  [CodeGroupItem](#codegroupitem) 组件的 Wrapper 。

## CodeGroupItem

- Props:
  - title
    - 类型： `string`
    - 是否必需： `true`
  - active
    - 类型： `boolean`
    - 默认值： `false`

- 详情：

  该组件必须放置在 [CodeGroup](#codegroup) 组件的内部。

  可以通过 `active` Prop 来设置初始激活的元素。如果不设置，默认激活第一个元素。

- 示例：

**输入**

````md
<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>
````

**输出**

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>

::: warning
你必须在 `<CodeGroupItem>` 的开始标签和代码块之间添加一个空行，否则代码块无法被 Markdown 正确解析。

所有内容首先都必须是合法的 Markdown ，然后才是一个 Vue SFC 。

了解更多： [Cookbook > Markdown 与 Vue SFC](../../advanced/cookbook/markdown-and-vue-sfc.md)

或者你可以选择使用 [自定义容器](./markdown.md#自定义容器) 。
:::
