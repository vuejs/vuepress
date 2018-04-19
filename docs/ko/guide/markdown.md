---
meta:
- name: keywords
  content: static docs generator vue
---

# 마크다운 확장 (Markdown Extensions)

## 헤더 앵커 (Header Anchors)

헤더는 자동으로 앵커 링크가 적용되도록합니다. 앵커의 렌더링은 [`markdown.anchor`](../config/ #markdownanchor) 옵션을 사용하여 구성됩니다.

## 링크 (Links)

- `.md` 또는`.html`로 끝나는 내부 링크는 SPA 탐색을 위해`<router-link>`로 변환됩니다.

  - [Home](/)
  - [Configuring Markdown](../config/#markdown)

- 외부 링크는 자동으로 `target = "_ blank"` 속성을 얻습니다:

  - [vuejs.org](https://vuejs.org)
  - [VuePress on GitHub](https://github.com/vuejs/vuepress)

## YAML Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/)는 기본적으로 지원됩니다:

``` yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

데이터는 나머지 페이지와 모든 사용자 정의 및 테마 구성 요소에서 `$page`로 사용할 수 있습니다.

`title`과 `lang`은 자동으로 현재 페이지에 설정됩니다. 또한 삽입 할 추가 메타 태그를 지정할 수 있습니다:

``` yaml
---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---
```

## 깃허브 테이블 스타일 (GitHub-Style Tables)

**Input**

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**Output**

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## 이모지 (Emoji)

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

## 컨텐츠 테이블 (Table of Contents)

**Input**

```
[[toc]]
```

**Output**

[[toc]]

Rendering of TOC can be configured using the [`markdown.toc`](../config/#markdowntoc) option.

## 커스텀 컨테이너 (Custom Containers)

**Input**

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

**Output**

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::

You can also customize the title of the block:

```
::: danger STOP
Danger zone, do not proceed
:::
```

::: danger STOP
Danger zone, do not proceed
:::

## 코드 블록 하이라이트 (Line Highlighting in Code Blocks)

**Input**

````
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 고급 설정 (Advanced Configuration)

VuePress는 [markdown-it](https://github.com/markdown-it/markdown-it)을 마크 다운 렌더러로 사용합니다. 위의 많은 확장 기능은 맞춤 플러그인을 통해 구현됩니다. `.vuepress/config.js`의 `markdown` 옵션을 사용하여 `markdown-it` 인스턴스를 더 커스터마이징 할 수 있습니다:

``` js
module.exports = {
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: md => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
