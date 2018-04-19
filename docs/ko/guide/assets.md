# Asset 핸들링 (Asset Handling)

## 상대 주소 (Relative URLs)

모든 마크 다운 파일은 Vue 구성 요소로 컴파일되고 webpack에 의해 처리되므로 상대 주소를 사용하여 모든 참조를 이용할 수 있고 선호해야합니다.

``` md
![An image](./image.png)
```

이것은 `*.vue`파일 템플릿과 같은 방식으로 작동됩니다. 이 이미지는 `url-loader` 와 `file-loader` 로 처리되어 생성된 정적 구조의 적절한 위치에 복사됩니다.

또한'~'접두사를 사용하여 이 모듈이 웹 페이지 모듈 요청임을 명시적으로 나타낼 수 있으므로 웹 페이지 별칭 또는 npm 종속성을 가진 파일로 참조할 수 있습니다:

``` md
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

webpack 별칭은 `.vuepress / config.js`에서 [configureWebpack](/config/#configurewebpack)을 통해 설정할 수 있습니다:

``` js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

## 공용 파일 (Public Files)

경우에 따라 파비콘이나 PWA 아이콘과 같은 요소는 구성 요소에서 직접 참조되지 않는 정적 파일을 제공해야 할 수도 있습니다. 이 경우 `.vuepress/public` 파일에 넣으면 생성 된 디렉토리의 루트에 복사됩니다.

## 기반 주소 (Base URL)

사이트가 루트가 아닌 URL에 배포 된 경우 `.vuepress/config.js`에 `base` 옵션을 설정해야합니다. 예를 들어, 사이트를 `https://foo.github.io/bar/`에 배포하고자 한다면,`base`는 `"/bar/"`로 설정되어야합니다.

기본 URL을 사용하여 `.vuepress/public` 이미지를 참조하려면 `/bar/image.png`와 같은 URL을 사용해야합니다. 그러나 나중에 `base`를 변경하는 것은 현재로서는 어렵습니다. 이를 돕기 위해 VuePress는 올바른 경로를 생성하는 내장 도우미 `$withBase`를 제공합니다:

``` vue
<img :src="$withBase('/foo.png')" alt="foo">
```

테마 구성 요소뿐만 아니라 귀하의 마크 다운 파일에서도 위의 구문을 사용할 수 있습니다.

또한`base`가 설정되면 `.vuepress/config.js` 옵션으로 모든 asset URL에 자동으로 추가됩니다.
