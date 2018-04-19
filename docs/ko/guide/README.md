# 소개 (Introduction)

VuePress는 뷰 테마 시스템을 포함하는 최소화된 정적 사이트 빌더와 기술문서 작성에 최적화된 기본 테마 두가지를 제공합니다.
VuePress는 Vue 하위의 프로젝트의 문서의 필요성에 의해 만들어졌습니다.

VuePress에 의해 생성 된 각 페이지는 훌륭한 로딩 성능을 제공하는 사전 렌더링 된 정적 HTML을 가지고 있으며 SEO 친화적입니다. 그러나 페이지가로드되면 Vue는 정적 컨텐츠를 가져와 단일 페이지(SPA)로 변환합니다. 추가 페이지는 사용자가 사이트를 탐색 할 때 가져옵니다.

## 작동원리 (How It Works)

VuePress 사이트는 [Vue](http://vuejs.org/), [Vue Router](https://github.com/vuejs/vue-router) 및 [webpack](http://webpack.js.org/)으로 만들어진 SPA입니다. 이전에 Vue를 사용했다면 사용자 정의 테마를 작성하거나 개발할 때 친숙한 개발 경험을 느낄 것입니다 (Vue DevTools를 사용하여 사용자 정의 테마를 디버깅 할 수도 있습니다).

빌드하는 동안 우리는 서버 렌더링 버전의 앱을 만들고 가상으로 각 경로를 방문하여 해당 HTML을 렌더링합니다. 이 접근법은 [Nuxt](https://nuxtjs.org/)의 `nuxt generate` 명령과 [Gatsby](https://www.gatsbyjs.org/)와 같은 다른 프로젝트에서 영감을 얻었습니다.

각 마크다운 파일은 [markdown-it](https://github.com/markdown-it/markdown-it)을 사용하여 HTML로 컴파일 된 다음 Vue 구성 요소의 템플릿으로 처리됩니다. 이렇게하면 마크다운 파일에서 Vue를 직접 사용할 수 있으며 동적 내용을 포함해야 할 때 유용합니다.

## 특징 (Features)

- 기술 문서에 최적화 된 [내장된 마크다운 익스텐션](./markdown.md)
- [마크다운 파일 내부에서 Vue를 활용할 수있는 능력](./ using-vue.md)
- [Vue에서 제공하는 커스텀 테마 시스템](./custom-themes.md)
- 자동 서비스 작업자 생성
- Google 애널리틱스 통합
- 다국어 지원
- 기본 테마는 다음과 같습니다.
  - 반응 형 레이아웃
  - 옵션 홈페이지
  - 간편한 out-of-the-box 헤더 기반 검색
  - 사용자 정의 할 수있는 탐색 표시 줄 및 사이드 바
  - 자동 생성 된 GitHub 링크 및 페이지 편집 링크

## 할 것 (Todo)

VuePress는 아직 진행 중입니다. 현재 지원하지 않지만, 계획되고있는 것이 몇 가지 있습니다.

- Algolia DocSearch 통합
- 블로그 지원

Contributions을 환영합니다!


## Why Not ...?

### Nuxt

Nuxt는 VuePress의 기능을 수행 할 수 있지만 응용 프로그램을 작성하기 위해 설계되었습니다. VuePress는 컨텐츠 중심 정적 사이트에 중점을두고 있으며 기술 문서에 맞는 기능을 즉시 제공합니다.

### Docsify / Docute

둘 다 훌륭한 프로젝트이며 Vue 지원을 받았습니다. 그들은 둘 다 완벽하게 런타임 구동 및 따라서 SEO 친화적입니다. SEO에 신경 쓰지 않고 의존성 설치를 망설이지 않으려면 여전히 훌륭한 선택입니다.

### Hexo

Hexo는 Vue 문서를 잘 서비스하고 있습니다. 사실, 우리의 주요 사이트를 마이그레이션 하는 길은 아직도 깁니다. 가장 큰 문제는 테마 시스템이 매우 정적 문자열 기반 인 것입니다. 레이아웃과 상호 작용 모두에 Vue를 활용하고 싶다고 생각합니다. 또한 Hexo 마크다운 렌더링을 설정하는 것은 유연하지 않습니다.