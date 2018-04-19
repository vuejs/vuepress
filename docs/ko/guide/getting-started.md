# 시작하기 (Getting Started)

::: warning 호환성 참고 사항
VuePress requires Node.js >= 8.
:::

## 전역 설치 (Global Installation)

VuePress를 가지고 놀고 싶다면 전역 모듈로 설치할 수 있습니다 :

``` bash
# install globally
yarn global add vuepress # OR npm install -g vuepress

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
vuepress dev

# build
vuepress build
```

## 기존 프로젝트에 설치 (Inside an Existing Project)

기존 프로젝트가 있고 프로젝트 내에 문서를 보관하려면 VuePress를 로컬 종속성으로 설치해야합니다. 또한 이 설정을 사용하면 설정을 추가하여 Netlify와 같은 서비스나 CI를 사용할 수 있습니다.

``` bash
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
echo '# Hello VuePress' > docs/README.md
```

::: warning
현재 webpack 3.x가 종속되어있는 기존 프로젝트에 VuePress를 설치할 때 npm 대신 [Yarn](https://yarnpkg.com/en/)을 사용하는 것이 좋습니다. 이 경우 Npm은 올바른 종속성 구조를 생성하지 못합니다.
:::

그리고 `package.json`을 추가합니다:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

설정 완료시 아래와 같이 동작시킬 수 있습니다:

``` bash
yarn docs:dev # OR npm run docs:dev
```

정적 문서를 생성하려면 다음을 실행하시면 됩니다:

``` bash
yarn docs:build # Or npm run docs:build
```

기본적으로 빌드 된 파일은`.vuepress / dist`에 있으며`.vuepress / config.js` '의 `dest` 필드를 통해 설정할 수 있습니다. 빌드 된 파일은 모든 정적 파일 서버에 배포 할 수 있습니다. 널리 사용되는 서비스에 대한 지침은 [배포 가이드](./deploy.md)를 참조하십시오.