# 구성 (Configuration)

## 설정 파일 (Config File)

설정을 하지 않으면 페이지가 거의 표시되지 않으며 사용자는 사이트를 탐색할 방법이 없습니다. 사이트를 사용자 커스터마이징 하려면 먼저 docs 디렉토리에`.vuepress` 디렉토리를 만듭니다. 여기에 모든 VuePress 관련 파일이 저장됩니다.

VuePress 사이트를 구성하는 데 필요한 필수 파일은 `.vuepress/ config.js`이며 JavaScript 객체를 export 해야합니다:

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```
개발 서버를 실행 중인 경우 이제 해당 페이지에 제목과 검색 상자가 있는 머리 글이 표시됩니다. VuePress에는 제목, `h2`와 `h3`머리 글에 있는 간단한 검색 색인을 모든 페이지에 자동으로 작성하는 머리 글 기반 검색 기능이 내장되어 있습니다.

옵션의 전체 목록은 [ConfigReference](../config/)를 참조하십시오.

## 테마 설정 (Theme Configuration)

VuePress는 사이트를 위해 사용자에게 권한을 부여할 수 있는 숫자입니다. VuePress 베이스로 전달됩니다

[사용자 지정 테마]를 개발하려면 [Custom](./custom-themes.md)을 참조하십시오.

## 애플리케이션 수준 향상 (App Level Enhancements)

VuePress 응용 프로그램은 표준 Vue 응용 프로그램이므로 `.vuepress/enhanceApp.js` 파일을 만들어 응용 프로그램 수준 향상을 할 수 있습니다. 파일은 일부 기본 앱 수준 값을 포함하는 객체를 받는 후크(hook) 함수를 `export default`해야합니다. 이 후크를 사용하여 추가 Vue 플러그인을 설치하거나, 전역 설정 요소를 등록하거나, router 후크를 추가 할 수 있습니다:

``` js
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router // the router instance for the app
}) => {
  // ...apply enhancements to the app
}
```
