# Markdown에서 Vue 사용 (Using Vue in Markdown)

## 브라우저 API액세스 제한 (Browser API Access Restrictions)

VuePress 응용 프로그램은 정적 빌드를 생성 할 때 Node.js에서 서버 렌더링되므로 Vue 사용은 [범용 코드 요구 사항](https://ssr.vuejs.org/en/universal.html)을 준수해야합니다. 요컨대, `beforeMounted` 또는`mounted` hooks으로 Browser/DOM API에 액세스해야합니다.

SSR에 친숙하지 않은 구성 요소 (예 : 사용자 지정 지시문 포함)를 사용하거나 데모하는 경우 내장 된 `<clientOnly>` 구성 요소에 포함할 수 있습니다:

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

**가져 오기시** 브라우저 API에 액세스하는 구성 요소 또는 라이브러리가 수정되지 않습니다. 가져 오기시 브라우저 환경을 사용하는 코드를 사용하려면 적절한 라이프 사이클 hooks로 동적으로 가져와야합니다:

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

## 템플릿 (Templating)

### Interpolation

각 마크 다운 파일은 먼저 HTML로 컴파일 된 다음 Vue 구성 요소로 `vue-loader`로 전달됩니다. 즉, 텍스트에서 Vue 스타일 Interpolation을 사용할 수 있습니다.

**Input**

``` md
{{ 1 + 1 }}
```

**Output**

<pre><code>{{ 1 + 1 }}</code></pre>

### 지시문 (Directives)

또한 지시문은 아래와 같이 동작할 수 있습니다:

**Input**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<pre><code><span v-for="i in 3">{{ i }} </span></code></pre>

### 사이트로 접근 & 페이지 데이터 (Access to Site & Page Data)

컴파일 된 구성 요소에는 private 데이터가 없지만 [사이트 메타 데이터](./custom-themes.md#site-and-page-metadata)에 대한 액세스 권한은 있습니다. 예 :

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

기본적으로 분리 된 코드 블록은`v-pre`로 자동 래핑됩니다. 인라인 코드 스 니펫 또는 일반 텍스트 내에 원시 mustaches 또는 Vue 특정 구문을 표시하려면 `v-pre` 사용자 정의 컨테이너로 단락을 래핑해야합니다:

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

## 컴포넌트 사용 (Using Components)

`.vuepress/components`에있는 `* .vue` 파일은 자동으로 [글로벌](https://vuejs.org/v2/guide/components-registration.html#Global-Registration) [비동기](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components) 구성 요소로 등록됩니다. 예 :

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      └─ OtherComponent.vue
```

모든 markdown 파일에서 구성 요소를 직접 사용할 수 있습니다:

``` md
<demo-1/>
<OtherComponent/>
```

<demo-1></demo-1>

<OtherComponent/>

::: warning IMPORTANT
사용자 정의 컴포넌트의 이름이 하이픈을 포함하거나 PascalCase에 있는지 확인하십시오. 그렇지 않으면 인라인 요소로 취급되어`<p>`태그 안에 싸이게됩니다.
:::

## 스크립트 & 스타일 Hoisting (Script & Style Hoisting)

JavaScript 또는 CSS를 현재 페이지에만 적용해야하는 경우가 있습니다. 이 경우 마크 업 파일에 root-level로 `<script>` 또는 `<style>` 블록을 직접 작성할 수 있으며, 컴파일 된 HTML에서 벗어나 `<script>` 및 `<style>` 단일 파일 로 작성할 수 있습니다.

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
      .textContent = 'This is rendered by inline script and styled by inline CSS'
  }
}
</script>
