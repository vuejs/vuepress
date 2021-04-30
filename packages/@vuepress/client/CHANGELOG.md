# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Performance Improvements

* **core:** reduce page data and component file size ([4c6eea5](https://github.com/vuepress/vuepress-next/commit/4c6eea5188e804cb3f6c7648d6528d43002618ae))


### BREAKING CHANGES

* **core:** `pagePath` prop of `<Content>` renamed to `pageKey`





# [2.0.0-beta.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **client:** implement ClientOnly correctly ([e27872d](https://github.com/vuepress/vuepress-next/commit/e27872d89f1e6894ebc734e2e26c800bea82e162))
* **client:** make hydration work properly (close [#123](https://github.com/vuepress/vuepress-next/issues/123)) ([34a5364](https://github.com/vuepress/vuepress-next/commit/34a5364ad6005e64a3e726296b9b8b73318fcbd4))


### Features

* **client:** support custom layout ([c32866d](https://github.com/vuepress/vuepress-next/commit/c32866d769cb5a29fb811fd2f00e06d7b94e1508))





# [2.0.0-beta.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Features

* **client:** provide client types file ([89a32b5](https://github.com/vuepress/vuepress-next/commit/89a32b50767ef82556f5ae3300ec016e0acaf0e5))





# [2.0.0-beta.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-beta.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)


### Bug Fixes

* **client:** install vue-router after clientAppEnhance (close [#100](https://github.com/vuepress/vuepress-next/issues/100)) ([2f5450f](https://github.com/vuepress/vuepress-next/commit/2f5450f0b8dcc4aa49b1c19a1adea6e84a1594c4))
* **client:** make page data hmr work as expected ([374ae43](https://github.com/vuepress/vuepress-next/commit/374ae43545c982ecc8762776035cc92359b874f5))





# [2.0.0-beta.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)


### Reverts

* refactor(client): remove extra handling for router base ([6205279](https://github.com/vuepress/vuepress-next/commit/620527917e4d3ee7cfa4c1db7d3cadc36a30eaab))





# [2.0.0-beta.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Bug Fixes

* **client:** ensure page component is loaded before route resolve ([598adf3](https://github.com/vuepress/vuepress-next/commit/598adf38b1f9edd3034bb011358a1a9d3bcb6b9e))


### Performance Improvements

* improve HMR support ([38f0073](https://github.com/vuepress/vuepress-next/commit/38f007335864db4c9125ea5905ca91850fb7103b))





# [2.0.0-beta.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-beta.1](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-beta.0](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Features

* implement vite hmr ([525c18d](https://github.com/vuepress/vuepress-next/commit/525c18d5a64fbdbdeb5ce1348ec1e1ead3dbd8f9))
* **client:** add defineClientAppEnhance and defineClientAppSetup utils ([1520517](https://github.com/vuepress/vuepress-next/commit/15205172c3b56fc8a879bba040f4ecc815d2c924))





# [2.0.0-alpha.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Code Refactoring

* **core:** remove theme data from site data ([187aef3](https://github.com/vuepress/vuepress-next/commit/187aef36607efc62d7b2d5c773553f89685cf64c))


### BREAKING CHANGES

* **core:** `themeConfig` is not available in site data any more





# [2.0.0-alpha.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2021-02-13)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)


### Bug Fixes

* **client:** only watch route path to update head ([3174f5a](https://github.com/vuepress/vuepress-next/commit/3174f5a676d95943df256b2be31227eb844d0144))





# [2.0.0-alpha.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)


### Features

* **core:** make language available in page data ([03bb09f](https://github.com/vuepress/vuepress-next/commit/03bb09fd51aeaff56d26820a1401b87ea8bdeb38))





# [2.0.0-alpha.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)


### Bug Fixes

* **client:** load existing head tags on mounted ([15722c5](https://github.com/vuepress/vuepress-next/commit/15722c5175e44a8d6363bfe5f138f2c2c8edeec3))


### Features

* **client:** make usePageFrontmatter generic ([2c5e5c1](https://github.com/vuepress/vuepress-next/commit/2c5e5c1400469a3cb4da2856104514a9413bff8a))





# [2.0.0-alpha.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)

**Note:** Version bump only for package @vuepress/client





# [2.0.0-alpha.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)


### Features

* **client:** remove built-in debug component ([a5962bb](https://github.com/vuepress/vuepress-next/commit/a5962bb82483f56800b33b4e35c50dcb49fd48b1))





# 2.0.0-alpha.1 (2020-12-01)


### Bug Fixes

* **client:** do not prepend base to http url ([9e4e623](https://github.com/vuepress/vuepress-next/commit/9e4e6233ce988bf3b6ebbbb1bc60f83a26f6709c))
* **client:** wrap ssr-app with a parent div ([c65b6c4](https://github.com/vuepress/vuepress-next/commit/c65b6c47f084466dde9daf17d1c1d00b88f6682d))


### Features

* **client:** add built-in styles for Debug component ([1b3b028](https://github.com/vuepress/vuepress-next/commit/1b3b028e0cd078eb6f074c36696255df1cf49267))
* **client:** add ClientOnly component ([e2cad36](https://github.com/vuepress/vuepress-next/commit/e2cad36c5f859240e5fac62c38fbaa14b39defab))
* **client:** add global computed and updateHead ([df83b88](https://github.com/vuepress/vuepress-next/commit/df83b887a69db9290a22d0731056f4ac2b6f0014))
* **client:** add global data utils ([46b9fc5](https://github.com/vuepress/vuepress-next/commit/46b9fc579f51c1f037f4850f8699074805799884))
* **client:** add OutboundLink component ([4107add](https://github.com/vuepress/vuepress-next/commit/4107add516e7acd0cbdc4a526bf4772c54fb6108))
* **client:** add siteLocale in debug component ([e1d663b](https://github.com/vuepress/vuepress-next/commit/e1d663b4ece27012c72383f5eecb90c5fb2195ef))
* **client:** add themeData injections ([04cafe2](https://github.com/vuepress/vuepress-next/commit/04cafe23ec835d9efc9a2b1ab8be8b7d8f0a22b4))
* **client:** add withBase util ([f234c5d](https://github.com/vuepress/vuepress-next/commit/f234c5d74f148b55b265d13dc2c868d8531d192a))
* **client:** augment route meta type ([6f4e1f5](https://github.com/vuepress/vuepress-next/commit/6f4e1f5995351a0dd6ebf257e1889d26e77d26e4))
* **client:** make siteData injections generic ([86b9416](https://github.com/vuepress/vuepress-next/commit/86b941646b7554b404a621a3616a7a81958c12c3))
* **client:** provide site locale data ([00455bd](https://github.com/vuepress/vuepress-next/commit/00455bdf21736254c8a3a488cdf8245e80742398))
* **client:** set scrollBehavior for vue-router ([f7a12ce](https://github.com/vuepress/vuepress-next/commit/f7a12ceaa1e20ba2e87fa34c692a754fcc3f34f4))
* **client:** support clientAppRootComponentFiles ([188c1a0](https://github.com/vuepress/vuepress-next/commit/188c1a04fed8ed6614b45a6a0c1cb3d07a4ca112))
* **client:** take 404 as the fallback layout ([bb34903](https://github.com/vuepress/vuepress-next/commit/bb349038da090d0e5fd9069ff5cfa3372c95dc0b))
