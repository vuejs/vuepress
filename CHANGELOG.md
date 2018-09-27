# [1.0.0-alpha.1](https://github.com/vuejs/vuepress/compare/v0.14.4...v1.0.0-alpha.1) (2018-09-27)

## other

#### Bug Fixes

* build error ([922bf13](https://github.com/vuejs/vuepress/commit/922bf13))
* build failed - wrong import ([1b234b3](https://github.com/vuejs/vuepress/commit/1b234b3))
* **$core:** Cannot assign to read only property 'exports' of object (close: [#869](https://github.com/vuejs/vuepress/issues/869)) ([47ac485](https://github.com/vuejs/vuepress/commit/47ac485))
* **$core:** null check for Layout components ([ade62c9](https://github.com/vuejs/vuepress/commit/ade62c9))
* **$core:** themePath should default to modulePath ([e2b6be8](https://github.com/vuejs/vuepress/commit/e2b6be8))
* **$pagination:** do not need to withBase & do not generate root html ([93f169a](https://github.com/vuejs/vuepress/commit/93f169a))
* **$test:** move babel config to test-utils to get correct transform ([91d8720](https://github.com/vuejs/vuepress/commit/91d8720))
* **dev:** Prevent files at node_modules from being watched (close: [#855](https://github.com/vuejs/vuepress/issues/855)) ([#856](https://github.com/vuejs/vuepress/issues/856)) ([2348e75](https://github.com/vuejs/vuepress/commit/2348e75))
#### Features

* **$blog:** support category and tag ([163f8a5](https://github.com/vuejs/vuepress/commit/163f8a5))
* **$cli:** support '--cache' and '--no-cache' flag ([2a46178](https://github.com/vuejs/vuepress/commit/2a46178))
* **$core:** 'define' plugin option and rewrite plugin API. ([0263f15](https://github.com/vuejs/vuepress/commit/0263f15))
* **$core:** alias - plugin API ([a5f58f7](https://github.com/vuejs/vuepress/commit/a5f58f7))
* **$core:** config the dev and ssr template. (close: [#733](https://github.com/vuejs/vuepress/issues/733)) ([38b3468](https://github.com/vuejs/vuepress/commit/38b3468))
* **$core:** enhanceAppFile doesn't need export default manually. ([eff7949](https://github.com/vuejs/vuepress/commit/eff7949))
* **$core:** flatten return array of functional option ([7b42984](https://github.com/vuejs/vuepress/commit/7b42984))
* **$core:** plugin option - chainMarkdown ([e380de3](https://github.com/vuejs/vuepress/commit/e380de3))
* plugin-search ([b0e3209](https://github.com/vuejs/vuepress/commit/b0e3209))
* **$core:** site config as plugin ([8a7ee6c](https://github.com/vuejs/vuepress/commit/8a7ee6c))
* **$core:** supoort pipeline plugin API. ([a122dfa](https://github.com/vuejs/vuepress/commit/a122dfa))
* **$core:** support 'palette' API, deprecate override.styl ([63555c0](https://github.com/vuejs/vuepress/commit/63555c0))
* **$core:** support passing in meta ([cb36ae6](https://github.com/vuejs/vuepress/commit/cb36ae6))
* **$core:** use markdown-it-chain ([4bc4331](https://github.com/vuejs/vuepress/commit/4bc4331))
* **$pagination:** correct meta title. ([91ebd10](https://github.com/vuejs/vuepress/commit/91ebd10))
* **$shared-utils:** support pass in an absolute path for theme ([24840cd](https://github.com/vuejs/vuepress/commit/24840cd))
#### Reverts

* change AsyncOption to prototype-style. ([a5cbd67](https://github.com/vuejs/vuepress/commit/a5cbd67))



# [0.14.4](https://github.com/vuejs/vuepress/compare/v0.14.3...v0.14.4) (2018-09-15)

## other

#### Bug Fixes

* missing config.base in google analytics page view URL (close: [#818](https://github.com/vuejs/vuepress/issues/818)) ([#834](https://github.com/vuejs/vuepress/issues/834)) ([559888b](https://github.com/vuejs/vuepress/commit/559888b))
* **$markdown:** sidebar headers not being detected (close: [#841](https://github.com/vuejs/vuepress/issues/841)) ([181c1e5](https://github.com/vuejs/vuepress/commit/181c1e5))



# [0.14.3](https://github.com/vuejs/vuepress/compare/v0.14.2...v0.14.3) (2018-09-13)

## other

#### Bug Fixes

* cannot run "yarn dev" at the root project dir ([4ad784c](https://github.com/vuejs/vuepress/commit/4ad784c))
* **$core:** do not pollute raw config ([dd9bea3](https://github.com/vuejs/vuepress/commit/dd9bea3))
* correct prepare usage ([bd25781](https://github.com/vuejs/vuepress/commit/bd25781))
* dev server hot relead failed - correct siteDate path ([7239daf](https://github.com/vuejs/vuepress/commit/7239daf))
* **$build:** do not pick "babel.config.js" at user-land (close: [#797](https://github.com/vuejs/vuepress/issues/797)) ([48be61b](https://github.com/vuejs/vuepress/commit/48be61b))
* ssr failed - move window accessing to mounted hook ([c97a531](https://github.com/vuejs/vuepress/commit/c97a531))
* **$core:** exclude non-content pages from the page components ([011c3c3](https://github.com/vuejs/vuepress/commit/011c3c3))
* **$core:** regression of changing inferTitle util ([6550f86](https://github.com/vuejs/vuepress/commit/6550f86))
* escape backslash ([#787](https://github.com/vuejs/vuepress/issues/787)) ([c19fb3a](https://github.com/vuejs/vuepress/commit/c19fb3a))
* missing component registration code ([7139532](https://github.com/vuejs/vuepress/commit/7139532))
* regression - avoid deliver 'content' to client side ([abc1d01](https://github.com/vuejs/vuepress/commit/abc1d01))
* unexpected error ([9292660](https://github.com/vuejs/vuepress/commit/9292660))
* valid filename for case-sensitive os ([#779](https://github.com/vuejs/vuepress/issues/779)) ([adb74b7](https://github.com/vuejs/vuepress/commit/adb74b7))
* yarn buiild failed. ([d3e2d09](https://github.com/vuejs/vuepress/commit/d3e2d09))
* **$core:** SSR error when async components were  registered in runtime. ([feb74eb](https://github.com/vuejs/vuepress/commit/feb74eb))
* **$register-components:** avoid file overwritten. ([1be40ab](https://github.com/vuejs/vuepress/commit/1be40ab))
#### Features

* [@vuepress](https://github.com/vuepress)/plugin-medium-zoom ([4492bcd](https://github.com/vuejs/vuepress/commit/4492bcd))
* allow to lanuch multiple apps with isolated context at the same time. ([d708d33](https://github.com/vuejs/vuepress/commit/d708d33))
* blog stage 1 - permalink ([#763](https://github.com/vuejs/vuepress/issues/763)) ([2bdf88c](https://github.com/vuejs/vuepress/commit/2bdf88c))
* Completely make '[@vuepress](https://github.com/vuepress)/plugin-pwa' a standalone plugin ([0652242](https://github.com/vuejs/vuepress/commit/0652242))
* delay apply plugin and create more APIs for test ([7dfee46](https://github.com/vuejs/vuepress/commit/7dfee46))
* empty temp dir before launching app ([b507fae](https://github.com/vuejs/vuepress/commit/b507fae))
* enhance plugin API - distinguish async and sync execution ([1fa57f6](https://github.com/vuejs/vuepress/commit/1fa57f6))
* expose isServer to enhanceApp files ([6f5c282](https://github.com/vuejs/vuepress/commit/6f5c282))
* init "[@vuepress](https://github.com/vuepress)/plugin-pwa" ([d74615d](https://github.com/vuejs/vuepress/commit/d74615d))
* init [@vuepress](https://github.com/vuepress)/plugin-blog ([1cba9bc](https://github.com/vuejs/vuepress/commit/1cba9bc))
* init [@vuepress](https://github.com/vuepress)/plugin-pagination ([4e340fc](https://github.com/vuejs/vuepress/commit/4e340fc))
* init [@vuepress](https://github.com/vuepress)/shared-utils ([ae6b3e9](https://github.com/vuejs/vuepress/commit/ae6b3e9))
* make sure the namesake plugin is only executed once. ([721f503](https://github.com/vuejs/vuepress/commit/721f503))
* markdown slots (close: [#594](https://github.com/vuejs/vuepress/issues/594)) ([99cd911](https://github.com/vuejs/vuepress/commit/99cd911))
* move 'writeTemp' to shared utility and support config temp path ([86c8dbf](https://github.com/vuejs/vuepress/commit/86c8dbf))
* plugin context - publicDir ([841e03e](https://github.com/vuejs/vuepress/commit/841e03e))
* **$pwa:** built-in i18n support, support "updatePopup: true" shortcut ([fa63b67](https://github.com/vuejs/vuepress/commit/fa63b67))
* refine plugin API ([9a50862](https://github.com/vuejs/vuepress/commit/9a50862))
* **$core:** detaMixin - expose $themeConfig ([357e1a5](https://github.com/vuejs/vuepress/commit/357e1a5))
* **$core:** execute 'i18n' (i.e. dataMixin) on both server and client side ([c7d8ee9](https://github.com/vuejs/vuepress/commit/c7d8ee9))
* **$core:** let 'core' provide a default NotFound component ([7f04708](https://github.com/vuejs/vuepress/commit/7f04708))
* **$core:** support 'dirname' field for 'clientDynamicModules' ([ee32e85](https://github.com/vuejs/vuepress/commit/ee32e85))
* **$core:** write all enhanceApp files to separate file. ([ac55f92](https://github.com/vuejs/vuepress/commit/ac55f92))
* refine theme API ([f81f373](https://github.com/vuejs/vuepress/commit/f81f373))
* respect name in local plugin config ([f346884](https://github.com/vuejs/vuepress/commit/f346884))
* set up [@vuepress](https://github.com/vuepress)/plugin-less ([4464185](https://github.com/vuejs/vuepress/commit/4464185))
* set up [@vuepress](https://github.com/vuepress)/plugin-sass ([5e46295](https://github.com/vuejs/vuepress/commit/5e46295))
* **$shared-utils:** enhance datatypes ([b80c810](https://github.com/vuejs/vuepress/commit/b80c810))
* set up [@vuepress](https://github.com/vuepress)/plugin-stylus ([17cd87d](https://github.com/vuejs/vuepress/commit/17cd87d))
* **$plugin-blog:** correct Layout for index page and one-level page ([078696e](https://github.com/vuejs/vuepress/commit/078696e))
* **$pwa:** support popupComponent and update docs ([216b8d5](https://github.com/vuejs/vuepress/commit/216b8d5))
* **$shared-utils:** allow change temp path at runtime via env. ([8e84065](https://github.com/vuejs/vuepress/commit/8e84065))
* **$shared-utils:** codegen util ([2d65bf2](https://github.com/vuejs/vuepress/commit/2d65bf2))
* **$shared-utils:** shortcutPackageResolver ([a8fea3c](https://github.com/vuejs/vuepress/commit/a8fea3c))
* **$theme-blog:** add 'type' field to page data and more reasonable layout fallback ([463625c](https://github.com/vuejs/vuepress/commit/463625c))
* support clean and multiple custom layout. / theme default layouts dir ([7f7fe18](https://github.com/vuejs/vuepress/commit/7f7fe18))
* support multiple option for plugin API. ([1747da1](https://github.com/vuejs/vuepress/commit/1747da1))
* using shortcut to resolve plugin ([2236365](https://github.com/vuejs/vuepress/commit/2236365))
* utility "normalizeConfig" ([4c2cccb](https://github.com/vuejs/vuepress/commit/4c2cccb))



# [0.14.2](https://github.com/vuejs/vuepress/compare/v0.14.1...v0.14.2) (2018-08-14)

## docs

#### Features

* expose config.styl variables to style.styl ([#727](https://github.com/vuejs/vuepress/issues/727)) ([0bc2b51](https://github.com/vuejs/vuepress/commit/0bc2b51))

## other

#### Bug Fixes

* SW-update popup only shows up on first page reload (close: [#677](https://github.com/vuejs/vuepress/issues/677)) ([6d8f813](https://github.com/vuejs/vuepress/commit/6d8f813))
#### Features

* [@vuepress](https://github.com/vuepress)/plugin-back-to-top ([b9fdf64](https://github.com/vuejs/vuepress/commit/b9fdf64))
* extract [@vuepress](https://github.com/vuepress)/cli ([c004fb3](https://github.com/vuejs/vuepress/commit/c004fb3))
* init [@vuepress](https://github.com/vuepress)/plugin-google-analytics ([397d01a](https://github.com/vuejs/vuepress/commit/397d01a))
* init [@vuepress](https://github.com/vuepress)/plugin-translation-ui ([014c86b](https://github.com/vuejs/vuepress/commit/014c86b))
* init monorepo ([7892556](https://github.com/vuejs/vuepress/commit/7892556))
* new theme api ([3f65817](https://github.com/vuejs/vuepress/commit/3f65817))
* **$plugin:** 'globalUIComponents' option ([5f07c39](https://github.com/vuejs/vuepress/commit/5f07c39))
* pass plugins and theme via cli ([0d7fce7](https://github.com/vuejs/vuepress/commit/0d7fce7))
* refine 'resolvePlugin' and 'resolveScopePackage' and update test ([8b0adcb](https://github.com/vuejs/vuepress/commit/8b0adcb))
* refine [@vuepress](https://github.com/vuepress)/plugin-register-components ([c390e40](https://github.com/vuejs/vuepress/commit/c390e40))
* support shortcut usage of [@vuepress](https://github.com/vuepress)/plugin-xxx ([ca78f66](https://github.com/vuejs/vuepress/commit/ca78f66))



# [0.14.1](https://github.com/vuejs/vuepress/compare/v0.14.0...v0.14.1) (2018-08-09)

## other

#### Bug Fixes

* default search box line wrap ([03c812b](https://github.com/vuejs/vuepress/commit/03c812b))
* navbar's regression - siteName null check ([02a4713](https://github.com/vuejs/vuepress/commit/02a4713))



# [0.14.0](https://github.com/vuejs/vuepress/compare/v0.13.1...v0.14.0) (2018-08-08)

## other

#### Bug Fixes

* algolia search doesn't work well at i18n mode ([e8a6ab1](https://github.com/vuejs/vuepress/commit/e8a6ab1))
* navbar's messy layout at narrow screen ([#714](https://github.com/vuejs/vuepress/issues/714)) ([3e1da57](https://github.com/vuejs/vuepress/commit/3e1da57))
* set alias "collapsible" to "collapsable" (close: [#705](https://github.com/vuejs/vuepress/issues/705)) ([#706](https://github.com/vuejs/vuepress/issues/706)) ([ad66fa8](https://github.com/vuejs/vuepress/commit/ad66fa8))
* skip format data.head if not exist while loading toml config ([#707](https://github.com/vuejs/vuepress/issues/707)) ([bb48a77](https://github.com/vuejs/vuepress/commit/bb48a77))
#### Features

* support writing HTML(Vue) anywhere in the header. ([#711](https://github.com/vuejs/vuepress/issues/711)) ([885496e](https://github.com/vuejs/vuepress/commit/885496e))
* **$webpack:** display host url at dev HMR log ([2e8d69c](https://github.com/vuejs/vuepress/commit/2e8d69c))



# [0.13.1](https://github.com/vuejs/vuepress/compare/v0.13.0...v0.13.1) (2018-08-01)

## other

#### Bug Fixes

* normalize override file path in windows ([#692](https://github.com/vuejs/vuepress/issues/692)) (close: [#642](https://github.com/vuejs/vuepress/issues/642)) ([9537c2c](https://github.com/vuejs/vuepress/commit/9537c2c))
* py lang label doesn't display in code block ([#690](https://github.com/vuejs/vuepress/issues/690)) ([88b65cc](https://github.com/vuejs/vuepress/commit/88b65cc))



# [0.13.0](https://github.com/vuejs/vuepress/compare/v0.12.0...v0.13.0) (2018-07-28)

## other

#### Bug Fixes

* missing space between italics and bold (close: [#661](https://github.com/vuejs/vuepress/issues/661)) ([7730ee1](https://github.com/vuejs/vuepress/commit/7730ee1))
* scoped styles of badge component (close: [#653](https://github.com/vuejs/vuepress/issues/653)) ([#657](https://github.com/vuejs/vuepress/issues/657)) ([9b602f2](https://github.com/vuejs/vuepress/commit/9b602f2))
* set babelrc: false in babel-loader options ([#644](https://github.com/vuejs/vuepress/issues/644)) ([c500201](https://github.com/vuejs/vuepress/commit/c500201))
* **$build:** exclude dest folder from pageFiles (close: [#654](https://github.com/vuejs/vuepress/issues/654)) ([#655](https://github.com/vuejs/vuepress/issues/655)) ([c1fe692](https://github.com/vuejs/vuepress/commit/c1fe692))
* **$build:** markdown config should be included in cache identifier ([0ad1a45](https://github.com/vuejs/vuepress/commit/0ad1a45))
* **$markdown:** cannot highlight external python file (.py) correctly (close: [#660](https://github.com/vuejs/vuepress/issues/660)) ([2a33075](https://github.com/vuejs/vuepress/commit/2a33075))
* **$seo:** Avoid duplicate description meta at runtime. (close: [#665](https://github.com/vuejs/vuepress/issues/665)) ([b207a5f](https://github.com/vuejs/vuepress/commit/b207a5f))
#### Features

* transform Badge into async component ([de9a51b](https://github.com/vuejs/vuepress/commit/de9a51b))
* **$cli:** debug flag at dev mode ([231da6a](https://github.com/vuejs/vuepress/commit/231da6a))
* **$pwa:** add themeConfig.serviceWorker.updatePopup option (close: [#453](https://github.com/vuejs/vuepress/issues/453)) ([#533](https://github.com/vuejs/vuepress/issues/533)) ([14dbd1e](https://github.com/vuejs/vuepress/commit/14dbd1e))



# [0.12.0](https://github.com/vuejs/vuepress/compare/v0.11.0...v0.12.0) (2018-07-12)

## other

#### Bug Fixes

* npm audit vulnerability (close: [#493](https://github.com/vuejs/vuepress/issues/493))([#641](https://github.com/vuejs/vuepress/issues/641)) ([8dde5d8](https://github.com/vuejs/vuepress/commit/8dde5d8))
* wrong sidebar slugs and anchor link at content (close: [#645](https://github.com/vuejs/vuepress/issues/645)) ([c2eaff3](https://github.com/vuejs/vuepress/commit/c2eaff3))
#### Features

* version data layer ([0c5b752](https://github.com/vuejs/vuepress/commit/0c5b752))
* **$default-theme:** new file-level API: style.styl. ([2f53f2f](https://github.com/vuejs/vuepress/commit/2f53f2f))



# [0.11.0](https://github.com/vuejs/vuepress/compare/v0.10.2...v0.11.0) (2018-07-08)

## docs

#### Features

* support display header links of all pages (close [#534](https://github.com/vuejs/vuepress/issues/534)) ([#595](https://github.com/vuejs/vuepress/issues/595)) ([36bb6a4](https://github.com/vuejs/vuepress/commit/36bb6a4))

## other

#### Bug Fixes

* **$default-theme:** indent-styled code is invisible (close: [#609](https://github.com/vuejs/vuepress/issues/609)) ([fd46a26](https://github.com/vuejs/vuepress/commit/fd46a26))
* cannot get sidebar when sidebar config contains non-ASCII chars. (close: [#628](https://github.com/vuejs/vuepress/issues/628)) ([8837e7a](https://github.com/vuejs/vuepress/commit/8837e7a))
* override style issues (close: [#637](https://github.com/vuejs/vuepress/issues/637)) ([#638](https://github.com/vuejs/vuepress/issues/638)) ([f998802](https://github.com/vuejs/vuepress/commit/f998802)), closes [webpack-contrib/mini-css-extract-plugin#130](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/130)
#### Features

* enhanceAppFiles: support dynamic content ([8f4bc4a](https://github.com/vuejs/vuepress/commit/8f4bc4a))
* page top slot ([f4c1059](https://github.com/vuejs/vuepress/commit/f4c1059))
* set exitCode to non-zero when catching error (close: [#598](https://github.com/vuejs/vuepress/issues/598) & [#570](https://github.com/vuejs/vuepress/issues/570)) ([#615](https://github.com/vuejs/vuepress/issues/615)) ([0907c7e](https://github.com/vuejs/vuepress/commit/0907c7e))



# [0.10.2](https://github.com/vuejs/vuepress/compare/v0.10.0...v0.10.2) (2018-06-20)

## docs

#### Features

* shouldPrefetch option for bundleRenderer (close: [#463](https://github.com/vuejs/vuepress/issues/463)) ([#514](https://github.com/vuejs/vuepress/issues/514)) ([9cb174d](https://github.com/vuejs/vuepress/commit/9cb174d))
* support "themeConfig.sidebar: 'auto'" (close: [#552](https://github.com/vuejs/vuepress/issues/552)) ([56cbb5f](https://github.com/vuejs/vuepress/commit/56cbb5f))

## other

#### Bug Fixes

* active side arrow not middle align ([#508](https://github.com/vuejs/vuepress/issues/508)). ([5fcac1b](https://github.com/vuejs/vuepress/commit/5fcac1b))
* build cannot exit (close: [#580](https://github.com/vuejs/vuepress/issues/580)) ([fa473a7](https://github.com/vuejs/vuepress/commit/fa473a7))
* compilation error when chainWebpack's code contains ! (close: [#532](https://github.com/vuejs/vuepress/issues/532)) ([3b5991f](https://github.com/vuejs/vuepress/commit/3b5991f))
* duplicate description meta (close: [#565](https://github.com/vuejs/vuepress/issues/565)) ([de35315](https://github.com/vuejs/vuepress/commit/de35315))
* edit page from Bitbucket ([#569](https://github.com/vuejs/vuepress/issues/569)) ([5479d6e](https://github.com/vuejs/vuepress/commit/5479d6e))
* enhance app doesn't work due to interface change ([a63f3ae](https://github.com/vuejs/vuepress/commit/a63f3ae))
* make 'activeHeaderLinks' backward compatible ([3ba2254](https://github.com/vuejs/vuepress/commit/3ba2254))
* **$default-theme:** code renders language css as c (close: [#527](https://github.com/vuejs/vuepress/issues/527)) ([777c4f1](https://github.com/vuejs/vuepress/commit/777c4f1))
* **$default-theme:** table tag cannot scroll horizontally (close: [#518](https://github.com/vuejs/vuepress/issues/518)) ([#519](https://github.com/vuejs/vuepress/issues/519)) ([e9cdee7](https://github.com/vuejs/vuepress/commit/e9cdee7))
* **$dev:** using config.yml/toml doesn't reload changes (close: [#520](https://github.com/vuejs/vuepress/issues/520)) ([6048eb9](https://github.com/vuejs/vuepress/commit/6048eb9))
* make 'lastUpdated' backward compatible ([eec3048](https://github.com/vuejs/vuepress/commit/eec3048))
* multiple markdown tokens in header text ([#564](https://github.com/vuejs/vuepress/issues/564)) ([ec330f0](https://github.com/vuejs/vuepress/commit/ec330f0))
* reserve '*' and '_' when detecting escape char '\' (close: [#544](https://github.com/vuejs/vuepress/issues/544)). ([4503cfc](https://github.com/vuejs/vuepress/commit/4503cfc))
* search box throw a error with no suggestions ([#510](https://github.com/vuejs/vuepress/issues/510)) ([1186d6a](https://github.com/vuejs/vuepress/commit/1186d6a))
* setting HMR port (close: [#582](https://github.com/vuejs/vuepress/issues/582)) ([#586](https://github.com/vuejs/vuepress/issues/586)) ([64bb80d](https://github.com/vuejs/vuepress/commit/64bb80d))
#### Features

* add support to import files as code fence ([#538](https://github.com/vuejs/vuepress/issues/538)) ([26ecff7](https://github.com/vuejs/vuepress/commit/26ecff7))
* add types check and friendly warn log for plugin options ([ea5f04b](https://github.com/vuejs/vuepress/commit/ea5f04b))
* better log ([#506](https://github.com/vuejs/vuepress/issues/506)) ([d53807e](https://github.com/vuejs/vuepress/commit/d53807e))
* Content component - support take pageKey to render dynamic page ([e8c08ce](https://github.com/vuejs/vuepress/commit/e8c08ce))
* enable header request Content-Range ([#555](https://github.com/vuejs/vuepress/issues/555)) ([825877c](https://github.com/vuejs/vuepress/commit/825877c))
* headers badge ([#540](https://github.com/vuejs/vuepress/issues/540)) ([c3696d2](https://github.com/vuejs/vuepress/commit/c3696d2))
* init plugin ([46e1992](https://github.com/vuejs/vuepress/commit/46e1992))
* internal and external plugins ([af14e4b](https://github.com/vuejs/vuepress/commit/af14e4b))
* make 'register-global-components' fully independent. ([b20c23b](https://github.com/vuejs/vuepress/commit/b20c23b))
* make lastUpdated as a plugin. ([50e3467](https://github.com/vuejs/vuepress/commit/50e3467))
* move enhanceApp and themeEnhanceApp to plugin. ([ab75ba9](https://github.com/vuejs/vuepress/commit/ab75ba9))
* refine Badge's API ([d68199d](https://github.com/vuejs/vuepress/commit/d68199d))
* rename 'dynamicClientCode' to 'dynamicClientModules' ([8bb3287](https://github.com/vuejs/vuepress/commit/8bb3287))
* rename 'dynamicClientModules' to 'clientDynamicModules' ([7863b56](https://github.com/vuejs/vuepress/commit/7863b56))
* support 'additionalPages' option ([9cd74b1](https://github.com/vuejs/vuepress/commit/9cd74b1))
* support 'clientRootMixin' option and change 'active-header-links' as a plugin. ([dd87d37](https://github.com/vuejs/vuepress/commit/dd87d37))
* support 'dynamicClientCode' option ([4f26102](https://github.com/vuejs/vuepress/commit/4f26102)), closes [#345](https://github.com/vuejs/vuepress/issues/345)
* support 'generated' hook and 'extendMarkdown' and 'enhanceDevServer' option ([f19da0a](https://github.com/vuejs/vuepress/commit/f19da0a))
* support 'updated' hook ([0bcc895](https://github.com/vuejs/vuepress/commit/0bcc895))
* support Array<Function|string> | Array<Array<Function|string, Options>> ([1a9689c](https://github.com/vuejs/vuepress/commit/1a9689c))
* support chainWebpack option ([0f3fa74](https://github.com/vuejs/vuepress/commit/0f3fa74))
* **$seo:** show page title in front of site title ([#522](https://github.com/vuejs/vuepress/issues/522)) ([ffe12b9](https://github.com/vuejs/vuepress/commit/ffe12b9))
* support context.writeTemp ([bc46896](https://github.com/vuejs/vuepress/commit/bc46896))
* support enhanceAppFiles API. ([5b00b02](https://github.com/vuejs/vuepress/commit/5b00b02))
* support generic markdown file path reference ([#509](https://github.com/vuejs/vuepress/issues/509)) ([292e4bc](https://github.com/vuejs/vuepress/commit/292e4bc))
* support spearate "loadComponent" util ([3b16c5c](https://github.com/vuejs/vuepress/commit/3b16c5c))



# [0.10.0](https://github.com/vuejs/vuepress/compare/v0.9.1...v0.10.0) (2018-05-25)

## other

#### Features

* upgrade to babel 7 + use [@vue](https://github.com/vue)/babel-preset-app ([c43c73d](https://github.com/vuejs/vuepress/commit/c43c73d))



# [0.9.1](https://github.com/vuejs/vuepress/compare/v0.9.0...v0.9.1) (2018-05-25)

## docs

#### Features

* allow for disabling of active hash on scroll ([#489](https://github.com/vuejs/vuepress/issues/489)) ([4c09627](https://github.com/vuejs/vuepress/commit/4c09627))

## other

#### Bug Fixes

* avoid cache error (close [#492](https://github.com/vuejs/vuepress/issues/492)) ([75cdc74](https://github.com/vuejs/vuepress/commit/75cdc74))
* fix config reload cache busting ([90f9689](https://github.com/vuejs/vuepress/commit/90f9689))
* lastUpdated looks bad when editLinks is false. ([11b1830](https://github.com/vuejs/vuepress/commit/11b1830))
* wrong OutboundLink insertion position (close: [#496](https://github.com/vuejs/vuepress/issues/496)) ([af96f28](https://github.com/vuejs/vuepress/commit/af96f28))
#### Features

* support filename that contains non-ASCII and unicode chars ([#473](https://github.com/vuejs/vuepress/issues/473)) ([566e681](https://github.com/vuejs/vuepress/commit/566e681))



# [0.9.0](https://github.com/vuejs/vuepress/compare/v0.8.4...v0.9.0) (2018-05-22)

## docs

#### Features

* hide edit link by page (close: [#284](https://github.com/vuejs/vuepress/issues/284)) ([#286](https://github.com/vuejs/vuepress/issues/286)) ([d46819c](https://github.com/vuejs/vuepress/commit/d46819c))
* last updated UI in default theme. ([#338](https://github.com/vuejs/vuepress/issues/338)) ([272df57](https://github.com/vuejs/vuepress/commit/272df57))
* support disable navbar globally ([#246](https://github.com/vuejs/vuepress/issues/246)) ([e725ad2](https://github.com/vuejs/vuepress/commit/e725ad2))
* support global markdown config for attributes of external links ([#358](https://github.com/vuejs/vuepress/issues/358)) ([20e5bd8](https://github.com/vuejs/vuepress/commit/20e5bd8))

## other

#### Bug Fixes

* $page is missing at 404 page ([#388](https://github.com/vuejs/vuepress/issues/388)) ([cefc8c3](https://github.com/vuejs/vuepress/commit/cefc8c3))
* avoid the searchbox exceeded out of screen in narrow screen ([#254](https://github.com/vuejs/vuepress/issues/254)) ([8f04081](https://github.com/vuejs/vuepress/commit/8f04081))
* code looks not good at small sreen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([6514c8f](https://github.com/vuejs/vuepress/commit/6514c8f))
* code looks not good at small sreen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([d0ef06f](https://github.com/vuejs/vuepress/commit/d0ef06f))
* dropdown overlap due to word wrapping (close: [#359](https://github.com/vuejs/vuepress/issues/359)) ([#360](https://github.com/vuejs/vuepress/issues/360)) ([c65a8b7](https://github.com/vuejs/vuepress/commit/c65a8b7))
* duplicate slash when docs dir is not set ([#361](https://github.com/vuejs/vuepress/issues/361)) ([0c59ed5](https://github.com/vuejs/vuepress/commit/0c59ed5))
* emoji doesn't work in toc (close: [#417](https://github.com/vuejs/vuepress/issues/417)) ([#418](https://github.com/vuejs/vuepress/issues/418)) ([1b9012e](https://github.com/vuejs/vuepress/commit/1b9012e))
* ensure `<script>` blocks in SFCs in node_modules are transpiled ([4bf56d7](https://github.com/vuejs/vuepress/commit/4bf56d7))
* glob patterns error on windows (close: [#348](https://github.com/vuejs/vuepress/issues/348)) ([#400](https://github.com/vuejs/vuepress/issues/400)) ([ab53998](https://github.com/vuejs/vuepress/commit/ab53998))
* highlight active link ([#272](https://github.com/vuejs/vuepress/issues/272)) doesn't work with non-EN hash. ([a51a31b](https://github.com/vuejs/vuepress/commit/a51a31b))
* highlight line issue for empty lines ([bc15841](https://github.com/vuejs/vuepress/commit/bc15841))
* highlight lines are cut when sliding ([#437](https://github.com/vuejs/vuepress/issues/437)) ([66bd797](https://github.com/vuejs/vuepress/commit/66bd797))
* image overflow at custom content (close: [#381](https://github.com/vuejs/vuepress/issues/381)) ([#383](https://github.com/vuejs/vuepress/issues/383)) ([145cf4f](https://github.com/vuejs/vuepress/commit/145cf4f))
* index file judgement bug (close: [#306](https://github.com/vuejs/vuepress/issues/306)) ([#308](https://github.com/vuejs/vuepress/issues/308)) ([fefa16c](https://github.com/vuejs/vuepress/commit/fefa16c))
* missing css source map at dev environment ([#460](https://github.com/vuejs/vuepress/issues/460)) ([d3025e5](https://github.com/vuejs/vuepress/commit/d3025e5))
* missing title and desc in 404 and custom theme. ([fcaee80](https://github.com/vuejs/vuepress/commit/fcaee80))
* nav link highlight issue with i18n (close: [#445](https://github.com/vuejs/vuepress/issues/445)) ([596014f](https://github.com/vuejs/vuepress/commit/596014f))
* postcss-loader warnings (close: [#278](https://github.com/vuejs/vuepress/issues/278)) ([34c7f99](https://github.com/vuejs/vuepress/commit/34c7f99))
* potential duplicate iteration keys at dropdown ([#249](https://github.com/vuejs/vuepress/issues/249)) ([1417a35](https://github.com/vuejs/vuepress/commit/1417a35))
* relative link checking ([31b8feb](https://github.com/vuejs/vuepress/commit/31b8feb))
* remove style override limitation to custom theme (close: 404) ([#405](https://github.com/vuejs/vuepress/issues/405)) ([69bd59d](https://github.com/vuejs/vuepress/commit/69bd59d))
* resolve custom theme from global cli (close: [#392](https://github.com/vuejs/vuepress/issues/392)) ([#399](https://github.com/vuejs/vuepress/issues/399)) ([01142df](https://github.com/vuejs/vuepress/commit/01142df))
* title cannot be number at front matter ([#297](https://github.com/vuejs/vuepress/issues/297)) ([5023d19](https://github.com/vuejs/vuepress/commit/5023d19))
* unexpected scroll behavior after clicking sidebar links ([#298](https://github.com/vuejs/vuepress/issues/298)) ([6081a3d](https://github.com/vuejs/vuepress/commit/6081a3d))
* unexpected top blank space when navbar is disable ([#316](https://github.com/vuejs/vuepress/issues/316)) ([2bdc68e](https://github.com/vuejs/vuepress/commit/2bdc68e))
* unexpected warning when using non-ASCII chars as filename. ([530912e](https://github.com/vuejs/vuepress/commit/530912e))
* upgrade webpack-serve and avoid port conflict (close [#424](https://github.com/vuejs/vuepress/issues/424)) ([#425](https://github.com/vuejs/vuepress/issues/425)) ([22ffe52](https://github.com/vuejs/vuepress/commit/22ffe52))
* use v-for with key ([#438](https://github.com/vuejs/vuepress/issues/438)) ([2076f7b](https://github.com/vuejs/vuepress/commit/2076f7b))
#### Features

* bump up webpack to 4.8.1 (close: [#309](https://github.com/vuejs/vuepress/issues/309)) ([9e3f005](https://github.com/vuejs/vuepress/commit/9e3f005))
* code line numbers (close: [#365](https://github.com/vuejs/vuepress/issues/365)) ([#379](https://github.com/vuejs/vuepress/issues/379)) ([9b42690](https://github.com/vuejs/vuepress/commit/9b42690))
* generate the timestamp of last updated for each doc (close [#258](https://github.com/vuejs/vuepress/issues/258)) ([#282](https://github.com/vuejs/vuepress/issues/282)) ([d9b290b](https://github.com/vuejs/vuepress/commit/d9b290b))
* handle telephone links ([#325](https://github.com/vuejs/vuepress/issues/325)) ([087467a](https://github.com/vuejs/vuepress/commit/087467a))
* header extraction improvement (close: [#238](https://github.com/vuejs/vuepress/issues/238)) ([#271](https://github.com/vuejs/vuepress/issues/271)) ([53c8489](https://github.com/vuejs/vuepress/commit/53c8489))
* highlight current region in sidebar ([#272](https://github.com/vuejs/vuepress/issues/272)) ([6b6d268](https://github.com/vuejs/vuepress/commit/6b6d268))
* make code type insensitive (close: [#347](https://github.com/vuejs/vuepress/issues/347)) ([5e87b65](https://github.com/vuejs/vuepress/commit/5e87b65))
* show OutboundLink icon for external links ([#428](https://github.com/vuejs/vuepress/issues/428)) ([942a2b9](https://github.com/vuejs/vuepress/commit/942a2b9))
* support render $page.excerpt to HTML (close: [#458](https://github.com/vuejs/vuepress/issues/458)) ([9510b9f](https://github.com/vuejs/vuepress/commit/9510b9f))
* support style lang postcss (close: [#461](https://github.com/vuejs/vuepress/issues/461)) ([881199a](https://github.com/vuejs/vuepress/commit/881199a))
* using babel and support JSX in vue. (close: [#318](https://github.com/vuejs/vuepress/issues/318)) ([#336](https://github.com/vuejs/vuepress/issues/336)) ([82cd8bd](https://github.com/vuejs/vuepress/commit/82cd8bd))
#### Performance Improvements

* vastly improve rebuild perf with caching ([dfdc00c](https://github.com/vuejs/vuepress/commit/dfdc00c))



# [0.8.4](https://github.com/vuejs/vuepress/compare/v0.8.3...v0.8.4) (2018-04-24)

## docs

#### Features

* support disable navbar via front matter (close: [#187](https://github.com/vuejs/vuepress/issues/187)) ([#232](https://github.com/vuejs/vuepress/issues/232)) ([504268c](https://github.com/vuejs/vuepress/commit/504268c))

## other

#### Bug Fixes

* algolia regression - missing options (close [#234](https://github.com/vuejs/vuepress/issues/234)) ([b19bd89](https://github.com/vuejs/vuepress/commit/b19bd89))



# [0.8.3](https://github.com/vuejs/vuepress/compare/v0.8.2...v0.8.3) (2018-04-23)

## other

#### Bug Fixes

* always write override.style ([9861deb](https://github.com/vuejs/vuepress/commit/9861deb))



# [0.8.2](https://github.com/vuejs/vuepress/compare/v0.8.1...v0.8.2) (2018-04-23)

## other

#### Bug Fixes

* nav-item underline use $accentColor ([#230](https://github.com/vuejs/vuepress/issues/230)) ([ddb590d](https://github.com/vuejs/vuepress/commit/ddb590d))
#### Features

* expose layout slots for injecting custom content ([3814e88](https://github.com/vuejs/vuepress/commit/3814e88))



# [0.8.1](https://github.com/vuejs/vuepress/compare/v0.8.0...v0.8.1) (2018-04-23)

## other

#### Bug Fixes

* algolia regression (close [#228](https://github.com/vuejs/vuepress/issues/228)) ([44b1201](https://github.com/vuejs/vuepress/commit/44b1201))



# [0.8.0](https://github.com/vuejs/vuepress/compare/v0.7.1...v0.8.0) (2018-04-23)

## docs

#### Bug Fixes

* fix emoji not showing on sidebars ([#206](https://github.com/vuejs/vuepress/issues/206)) ([bc2c83a](https://github.com/vuejs/vuepress/commit/bc2c83a))
#### Features

* Add docsRepo ([#155](https://github.com/vuejs/vuepress/issues/155)) ([716aefe](https://github.com/vuejs/vuepress/commit/716aefe))
* expose all css pre-processor's options. (close [#169](https://github.com/vuejs/vuepress/issues/169)) ([#178](https://github.com/vuejs/vuepress/issues/178)) ([8f0755a](https://github.com/vuejs/vuepress/commit/8f0755a))
* support built-in pug config and document using pro-processors at component ([#151](https://github.com/vuejs/vuepress/issues/151)) ([f322105](https://github.com/vuejs/vuepress/commit/f322105))
* support excerpt extraction with `<!-- more -->` (close [#174](https://github.com/vuejs/vuepress/issues/174)) ([fa404dc](https://github.com/vuejs/vuepress/commit/fa404dc))

## other

#### Bug Fixes

* algolia check should be checking themeConfig.algolia ([504c21d](https://github.com/vuejs/vuepress/commit/504c21d))
* default to localhost on windows (close [#221](https://github.com/vuejs/vuepress/issues/221)) ([4d5c50e](https://github.com/vuejs/vuepress/commit/4d5c50e))
* fix Sidebar link active logic ([#215](https://github.com/vuejs/vuepress/issues/215)) ([9c93d8f](https://github.com/vuejs/vuepress/commit/9c93d8f))
* Fix the style of repo link. ([f55fa00](https://github.com/vuejs/vuepress/commit/f55fa00))
* fix title inferrence regression (close [#208](https://github.com/vuejs/vuepress/issues/208)) ([52c20cf](https://github.com/vuejs/vuepress/commit/52c20cf))
* renames index.js to enhanceApp.js ([#226](https://github.com/vuejs/vuepress/issues/226)) ([0170449](https://github.com/vuejs/vuepress/commit/0170449))
* siteTitle vs pageTitle ([cd9b788](https://github.com/vuejs/vuepress/commit/cd9b788))
#### Features

* add max search suggestions config ([#163](https://github.com/vuejs/vuepress/issues/163)) ([a16a5b4](https://github.com/vuejs/vuepress/commit/a16a5b4))
* Algolia DocSearch Integration  ([#201](https://github.com/vuejs/vuepress/issues/201)) ([2f0da01](https://github.com/vuejs/vuepress/commit/2f0da01))
* also expose siteData in enhanceApp.js ([5157c6f](https://github.com/vuejs/vuepress/commit/5157c6f))
* support for TOML front matter ([#141](https://github.com/vuejs/vuepress/issues/141)) ([#164](https://github.com/vuejs/vuepress/issues/164)) ([70620ba](https://github.com/vuejs/vuepress/commit/70620ba))
* support toml config ([#138](https://github.com/vuejs/vuepress/issues/138)) ([d136e22](https://github.com/vuejs/vuepress/commit/d136e22))
* theme index enhancment support ([#154](https://github.com/vuejs/vuepress/issues/154)) ([d026801](https://github.com/vuejs/vuepress/commit/d026801))



# [0.7.1](https://github.com/vuejs/vuepress/compare/v0.7.0...v0.7.1) (2018-04-20)

## docs

#### Bug Fixes

* infer source link label from repo url ([#168](https://github.com/vuejs/vuepress/issues/168)) ([c1bbd05](https://github.com/vuejs/vuepress/commit/c1bbd05))

## other

#### Bug Fixes

* Only add language dropdown when there has more than one locale configured. ([#181](https://github.com/vuejs/vuepress/issues/181)) ([7f311da](https://github.com/vuejs/vuepress/commit/7f311da))
* prioritize frontmatter's title, description and lang ([#180](https://github.com/vuejs/vuepress/issues/180)) ([384c5c7](https://github.com/vuejs/vuepress/commit/384c5c7)), closes [#177](https://github.com/vuejs/vuepress/issues/177) [#184](https://github.com/vuejs/vuepress/issues/184)
* redirect /foo to /foo/ during dev (close [#183](https://github.com/vuejs/vuepress/issues/183)) ([99bc0aa](https://github.com/vuejs/vuepress/commit/99bc0aa))
* show navbar in more conditions (close [#170](https://github.com/vuejs/vuepress/issues/170)) ([748fa7f](https://github.com/vuejs/vuepress/commit/748fa7f))



# [0.7.0](https://github.com/vuejs/vuepress/compare/v0.6.1...v0.7.0) (2018-04-18)

## docs

#### Features

* adjust i18n config + documentation ([bccddbf](https://github.com/vuejs/vuepress/commit/bccddbf))
* i18n for edit link text ([6f5bac0](https://github.com/vuejs/vuepress/commit/6f5bac0))

## other

#### Bug Fixes

* disable typographer in markdown-it (close [#139](https://github.com/vuejs/vuepress/issues/139)) ([be42da5](https://github.com/vuejs/vuepress/commit/be42da5))
* ensure runnable when no locales are provided ([a25d86c](https://github.com/vuejs/vuepress/commit/a25d86c))
* fix yarn global install (fix [#102](https://github.com/vuejs/vuepress/issues/102)) ([1130318](https://github.com/vuejs/vuepress/commit/1130318))
* handle links with encoded hash ([f0a1a00](https://github.com/vuejs/vuepress/commit/f0a1a00))
* search for locales ([4cf1232](https://github.com/vuejs/vuepress/commit/4cf1232))



# [0.6.1](https://github.com/vuejs/vuepress/compare/v0.6.0...v0.6.1) (2018-04-18)

## other

#### Bug Fixes

* handle headers that start with numbers (fix [#121](https://github.com/vuejs/vuepress/issues/121)) ([ad83169](https://github.com/vuejs/vuepress/commit/ad83169))
* make search locale-scoped (close [#128](https://github.com/vuejs/vuepress/issues/128)) ([846eb59](https://github.com/vuejs/vuepress/commit/846eb59))
* **nav:** unepxected error when themeConfig.nav isn't given. (close: [#125](https://github.com/vuejs/vuepress/issues/125)) ([#127](https://github.com/vuejs/vuepress/issues/127)) ([f052472](https://github.com/vuejs/vuepress/commit/f052472))
* service worker path ([51c6eb2](https://github.com/vuejs/vuepress/commit/51c6eb2))
* use correct host in tip after the server has started ([#130](https://github.com/vuejs/vuepress/issues/130)) ([fd447ae](https://github.com/vuejs/vuepress/commit/fd447ae))
* use header's slug as it is if possible ([#119](https://github.com/vuejs/vuepress/issues/119)) ([5f7e199](https://github.com/vuejs/vuepress/commit/5f7e199))
#### Features

* enable source map in build error traces ([efff472](https://github.com/vuejs/vuepress/commit/efff472))
* **sidebar:** support click the part outside sidebar to close the sidebar. ([#132](https://github.com/vuejs/vuepress/issues/132)) ([c6c71af](https://github.com/vuejs/vuepress/commit/c6c71af))



# [0.6.0](https://github.com/vuejs/vuepress/compare/v0.5.1...v0.6.0) (2018-04-18)

## docs

#### Features

* Multiple Language Support + Complete Chinese Translation ([#48](https://github.com/vuejs/vuepress/issues/48)) ([8bbc5f3](https://github.com/vuejs/vuepress/commit/8bbc5f3))

## other

#### Bug Fixes

* allow viewport scaling (close [#110](https://github.com/vuejs/vuepress/issues/110)) ([2b2a07d](https://github.com/vuejs/vuepress/commit/2b2a07d))
* cli build --dest flag ([#97](https://github.com/vuejs/vuepress/issues/97)) ([e32d90b](https://github.com/vuejs/vuepress/commit/e32d90b))
* css safe ([#96](https://github.com/vuejs/vuepress/issues/96)) ([be82e09](https://github.com/vuejs/vuepress/commit/be82e09))
* **default-theme:** only show features div if provided ([3f76bfe](https://github.com/vuejs/vuepress/commit/3f76bfe))
* ensure using the same markdown config when extracting headers ([14d4d25](https://github.com/vuejs/vuepress/commit/14d4d25))
* handle index.md when checking relative links ([52d6672](https://github.com/vuejs/vuepress/commit/52d6672))
#### Features

* support yaml config ([#115](https://github.com/vuejs/vuepress/issues/115)) ([3088b3e](https://github.com/vuejs/vuepress/commit/3088b3e))



# [0.5.1](https://github.com/vuejs/vuepress/compare/v0.5.0...v0.5.1) (2018-04-17)

## other

#### Bug Fixes

* correctly resolve not-found path ([#90](https://github.com/vuejs/vuepress/issues/90)) ([c3dd0b1](https://github.com/vuejs/vuepress/commit/c3dd0b1))
* meta viewport for iOS tap delay ([f95e245](https://github.com/vuejs/vuepress/commit/f95e245))
* support mailto links in NavLink + style tweaks (close [#93](https://github.com/vuejs/vuepress/issues/93)) ([62cd00e](https://github.com/vuejs/vuepress/commit/62cd00e))
* upgrade webpack-chain, fix css optimization settings (close [#91](https://github.com/vuejs/vuepress/issues/91)) ([1bbfa43](https://github.com/vuejs/vuepress/commit/1bbfa43))
#### Features

* allow configuring host + default to 0.0.0.0 (close [#86](https://github.com/vuejs/vuepress/issues/86)) ([9936696](https://github.com/vuejs/vuepress/commit/9936696))



# [0.5.0](https://github.com/vuejs/vuepress/compare/v0.4.2...v0.5.0) (2018-04-16)

## docs

#### Features

* support adding custom page class in front matter ([#85](https://github.com/vuejs/vuepress/issues/85)) ([40ca73c](https://github.com/vuejs/vuepress/commit/40ca73c)), closes [#84](https://github.com/vuejs/vuepress/issues/84)

## other

#### Features

* dropdown Items in Navbar ([#13](https://github.com/vuejs/vuepress/issues/13)) ([79f8f14](https://github.com/vuejs/vuepress/commit/79f8f14))
* enhanceApp.js ([#80](https://github.com/vuejs/vuepress/issues/80)) ([37ea038](https://github.com/vuejs/vuepress/commit/37ea038))



# [0.4.2](https://github.com/vuejs/vuepress/compare/v0.4.1...v0.4.2) (2018-04-16)

## other

#### Bug Fixes

* proper minimum node version warning ([eb07685](https://github.com/vuejs/vuepress/commit/eb07685))



# [0.4.1](https://github.com/vuejs/vuepress/compare/v0.4.0...v0.4.1) (2018-04-16)

## other

#### Bug Fixes

* always transpile lib directory ([#73](https://github.com/vuejs/vuepress/issues/73)) ([56e0392](https://github.com/vuejs/vuepress/commit/56e0392))
* avoid html-webpack-plugin requiring incomaptible webpack internals ([4816bef](https://github.com/vuejs/vuepress/commit/4816bef))
* prioritize own deps + avoid serving wrong index.html (fix [#69](https://github.com/vuejs/vuepress/issues/69)) ([781e37a](https://github.com/vuejs/vuepress/commit/781e37a))
* redirect */index.html to */ (close [#83](https://github.com/vuejs/vuepress/issues/83)) ([52e04c4](https://github.com/vuejs/vuepress/commit/52e04c4))
* remove override import when ejecting (close [#56](https://github.com/vuejs/vuepress/issues/56)) ([2d811ed](https://github.com/vuejs/vuepress/commit/2d811ed))
* remove unnecessary spread ([63816c1](https://github.com/vuejs/vuepress/commit/63816c1))
#### Features

* add <kbd> styles ([#60](https://github.com/vuejs/vuepress/issues/60)) ([580774b](https://github.com/vuejs/vuepress/commit/580774b))



# [0.4.0](https://github.com/vuejs/vuepress/compare/v0.3.3...v0.4.0) (2018-04-15)

## other

#### Features

* allow default theme to be copied as custom theme ([98e1665](https://github.com/vuejs/vuepress/commit/98e1665))
* vuepress eject for customizing default theme ([89538fa](https://github.com/vuejs/vuepress/commit/89538fa))



# [0.3.3](https://github.com/vuejs/vuepress/compare/v0.3.2...v0.3.3) (2018-04-15)

## other

#### Bug Fixes

* fix outbound nav links (close [#37](https://github.com/vuejs/vuepress/issues/37)) ([c909007](https://github.com/vuejs/vuepress/commit/c909007))



# [0.3.2](https://github.com/vuejs/vuepress/compare/v0.3.1...v0.3.2) (2018-04-15)

## other

#### Bug Fixes

* added escaping of meta tag attribute value ([#29](https://github.com/vuejs/vuepress/issues/29)) ([15a1ac8](https://github.com/vuejs/vuepress/commit/15a1ac8))
* escape text in code block when lang is text or not specified [#31](https://github.com/vuejs/vuepress/issues/31) ([#32](https://github.com/vuejs/vuepress/issues/32)) ([ac4acab](https://github.com/vuejs/vuepress/commit/ac4acab))
* **dev build:** use portfinder ([#30](https://github.com/vuejs/vuepress/issues/30)) ([f2a8229](https://github.com/vuejs/vuepress/commit/f2a8229)), closes [#26](https://github.com/vuejs/vuepress/issues/26)
* generate better slugs for non latin langs (close [#45](https://github.com/vuejs/vuepress/issues/45)) ([e08e3d2](https://github.com/vuejs/vuepress/commit/e08e3d2))
* hoistedTags may not always be present (close [#35](https://github.com/vuejs/vuepress/issues/35)) ([ed33515](https://github.com/vuejs/vuepress/commit/ed33515))
* home link '/' shouldn’t always stays active ([#47](https://github.com/vuejs/vuepress/issues/47)) ([67c758e](https://github.com/vuejs/vuepress/commit/67c758e))
* images should have 100% max width ([9e63974](https://github.com/vuejs/vuepress/commit/9e63974))
* renderChildren / sidebarDepth: 0 ([42f63a8](https://github.com/vuejs/vuepress/commit/42f63a8))
#### Features

* add warning about node version on startup (close [#51](https://github.com/vuejs/vuepress/issues/51)) ([1118327](https://github.com/vuejs/vuepress/commit/1118327))



# [0.3.1](https://github.com/vuejs/vuepress/compare/v0.3.0...v0.3.1) (2018-04-14)

## other

#### Bug Fixes

* **style:** prevent scrollbar in code ([#18](https://github.com/vuejs/vuepress/issues/18)) ([a3db4d2](https://github.com/vuejs/vuepress/commit/a3db4d2))
* code margin on mobile ([695440f](https://github.com/vuejs/vuepress/commit/695440f))
#### Features

* commands now defaults targetDir to cwd. ([#25](https://github.com/vuejs/vuepress/issues/25)) ([22b7943](https://github.com/vuejs/vuepress/commit/22b7943)), closes [#8](https://github.com/vuejs/vuepress/issues/8)



# [0.3.0](https://github.com/vuejs/vuepress/compare/v0.2.2...v0.3.0) (2018-04-14)



# [0.2.2](https://github.com/vuejs/vuepress/compare/v0.2.1...v0.2.2) (2018-04-14)



# [0.2.1](https://github.com/vuejs/vuepress/compare/v0.2.0...v0.2.1) (2018-04-14)

## other

#### Bug Fixes

* fix vuepress cant resolve custom theme under .vuepress/theme ([#3](https://github.com/vuejs/vuepress/issues/3)) ([133bdb3](https://github.com/vuejs/vuepress/commit/133bdb3))



# [0.2.0](https://github.com/vuejs/vuepress/compare/v0.1.0...v0.2.0) (2018-04-13)

## docs

#### Features

* google analytics ([764ccd5](https://github.com/vuejs/vuepress/commit/764ccd5))

## other

#### Features

* auto detect invalid inbound links ([ca82906](https://github.com/vuejs/vuepress/commit/ca82906))
* pwa ([664a8e0](https://github.com/vuejs/vuepress/commit/664a8e0))



# 0.1.0 (2018-04-12)

## other

#### Bug Fixes

* css extraction ([d293194](https://github.com/vuejs/vuepress/commit/d293194))
* workaround for empty style chunk ([701658a](https://github.com/vuejs/vuepress/commit/701658a))
#### Features

* dev server ([890f929](https://github.com/vuejs/vuepress/commit/890f929))
* support nesting in sidebar ([1964709](https://github.com/vuejs/vuepress/commit/1964709))
* support style/script hoisting + css modules ([f97e676](https://github.com/vuejs/vuepress/commit/f97e676))



