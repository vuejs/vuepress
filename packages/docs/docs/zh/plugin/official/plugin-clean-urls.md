---
title: clean-urls
metaTitle: 自动生成简洁链接的插件 | VuePress
---

# [@vuepress/plugin-clean-urls](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-clean-urls)

> 用于自动生成简洁链接的插件。<Badge text="1.0.0-alpha.40+"/>

## 安装

```bash
yarn add -D @vuepress/plugin-clean-urls@next
# OR npm install -D @vuepress/plugin-clean-urls@next
```

## 使用

```javascript
module.exports = {
  plugins: ['@vuepress/clean-urls'] 
}
```

::: warning 注意
这个插件在 dev 服务器上总是生效的，但 VuePress **并没有能力**去修改服务器识别链接的方式。如果你希望你的网站地址符合某种特殊的模式（比如使用 `/routing` 而不是 `/routing.html` 或者 `routing/`），你需要确保你的服务器会将这些地址认为是 HTML。这可能意味着你需要对你的服务器进行特殊的配置。

参考资料：

- Netify 用户: [https://www.netlify.com/docs/redirects/#trailing-slash](https://www.netlify.com/docs/redirects/#trailing-slash).
- Surge 用户: [https://surge.sh/help/using-clean-urls-automatically](https://surge.sh/help/using-clean-urls-automatically).
:::

## 选项

### normalSuffix

- 类型: `string`
- 默认值: `''`

普通页面的链接后缀。举个例子，`foo/bar.md` 会自动变成：

- `foo/bar.html` 在默认情况下（未安装本插件时）
- `foo/bar/`（当 `normalSuffix` 被设为 `'/'` 时）
- `foo/bar`（当 `normalSuffix` 被设为 `''` 时）

### indexSuffix

- 类型: `string`
- 默认值: `'/'`

索引页面的链接后缀。举个例子，`foo/index.md` 会自动变成：

- `foo/` 在默认情况下（未安装本插件时）
- `foo`（当 `indexSuffix` 被设为 `''` 时）
- `foo/index.html`（当 `indexSuffix` 被设为 `'/index.html'` 时）

::: tip
索引页面是指文件名为 index.md 或者 readme.md 的页面（不区分大小写）。
:::
