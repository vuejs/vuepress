# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-alpha.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/vuepress-next/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))
* **markdown:** fix assets relative path handling (close [#33](https://github.com/vuepress/vuepress-next/issues/33)) ([9a95431](https://github.com/vuepress/vuepress-next/commit/9a95431aa3994855f7194d3efe810b4fd2cf72d9))


### Features

* **cli:** show info of vue packages ([2d19e84](https://github.com/vuepress/vuepress-next/commit/2d19e84c1ac24e1a127d330009617c42eb7a2bc3))





# [2.0.0-alpha.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)


### Bug Fixes

* **core:** fix site locale data type ([7898500](https://github.com/vuepress/vuepress-next/commit/7898500f8b611662777ca3bdeb89c5b3bb658595))
* **theme-default:** click to close dropdown that opened by tab and click ([88d1ae2](https://github.com/vuepress/vuepress-next/commit/88d1ae2bf6a92113ece8efa7ed57352b34ad18c4))
* **theme-default:** fix font-size of dropdown group title ([563156c](https://github.com/vuepress/vuepress-next/commit/563156cb8458aeb71fadd882b08e03bee8ae5fba))


### Features

* **core:** provide app in all plugin hooks ([21cc3a6](https://github.com/vuepress/vuepress-next/commit/21cc3a608e54d38de8de8f453b5e88031b4cedb1))


### Reverts

* fix(theme-default): remove outline when focused on dropdown button ([66d3feb](https://github.com/vuepress/vuepress-next/commit/66d3feba01bf8a3ce751788a9a025dd69757efb4))





# [2.0.0-alpha.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2021-01-03)


### Bug Fixes

* **bundler-webpack:** remove esbuild minimizer ([4b3c00b](https://github.com/vuepress/vuepress-next/commit/4b3c00becad376fed98bfaef700e565c19724a0b))
* **core:** fix page date resolving ([de6c5c8](https://github.com/vuepress/vuepress-next/commit/de6c5c8ca89347bea4ba2925e283a7b710a5b5d3))
* **plugin-docsearch:** fix docsearch style issue ([7550587](https://github.com/vuepress/vuepress-next/commit/7550587dbdf876b834dc14aa83847fabf1dba668))
* **theme-default:** assign default locale data ([d59f55d](https://github.com/vuepress/vuepress-next/commit/d59f55d355299a8edbdb43986cc7aaff5345ea1f))
* **theme-default:** fix overflow style of code block line-numbers ([dd77cf4](https://github.com/vuepress/vuepress-next/commit/dd77cf448a28423ee23930b3d76601d8a5a6da18))
* **theme-default:** remove outline when focused on dropdown button ([77842e3](https://github.com/vuepress/vuepress-next/commit/77842e396f1ebcc9e874af537a6520b818d028c2))
* **theme-default:** set font-size explicitly for h4 to h6 ([a6459c0](https://github.com/vuepress/vuepress-next/commit/a6459c0eca38fbc19545442581ea6f0e73908b30))
* **vuepress:** add a wrapper for cli bin (close [#21](https://github.com/vuepress/vuepress-next/issues/21)) ([2708ac3](https://github.com/vuepress/vuepress-next/commit/2708ac325c05a39cc5139e7e5f902e2fead5ca7a))





# [2.0.0-alpha.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)


### Bug Fixes

* **markdown:** only prepend prefix to explicit relative image path ([8d6a095](https://github.com/vuepress/vuepress-next/commit/8d6a095ace0ed724b4ac4eea0e44a28f120a48bc))
* **plugin-git:** replace -P with --no-pager for better compatibility (close [#16](https://github.com/vuepress/vuepress-next/issues/16)) ([f394c78](https://github.com/vuepress/vuepress-next/commit/f394c78a06a3dae7cea91759db6010d04746f999))


### Features

* **cli:** respect conventional clientAppEnhance files (close [#20](https://github.com/vuepress/vuepress-next/issues/20)) ([0777376](https://github.com/vuepress/vuepress-next/commit/0777376bcb5cafec50f47877a6bf3926d6ff0076))





# [2.0.0-alpha.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)


### Bug Fixes

* **markdown:** support v-on shorthand in html inline tags ([86a1299](https://github.com/vuepress/vuepress-next/commit/86a1299d16555fb453f36aa1db49ff9ce184e874))
* **theme-default:** fix navbar type to allow nested group ([9ef46ae](https://github.com/vuepress/vuepress-next/commit/9ef46ae3d41dc56c536d884665d28f71a7883a59))


### Features

* **markdown:** code-block-level config for line-numbers and v-pre ([9ac3e4a](https://github.com/vuepress/vuepress-next/commit/9ac3e4a12066f8b05e5d3a5211adf837a944c29d))





# [2.0.0-alpha.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2020-12-17)


### Bug Fixes

* **bundler-webpack:** freeze webpack version ([95523a2](https://github.com/vuepress/vuepress-next/commit/95523a2f2b32f8dad773c74553bd22a0940cd27a))





# [2.0.0-alpha.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2020-12-17)


### Bug Fixes

* **theme-default:** fix content headers styles ([7ead1f6](https://github.com/vuepress/vuepress-next/commit/7ead1f60db5135ed7d1a428cb23fecbbc11b223e))


### Features

* **cli:** add info command ([1f30993](https://github.com/vuepress/vuepress-next/commit/1f30993a920189c0de89e413d85feb957546e47f))





# [2.0.0-alpha.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2020-12-16)


### Bug Fixes

* **bundler-webpack:** freeze version of prerelease packages ([50d5fa0](https://github.com/vuepress/vuepress-next/commit/50d5fa0b88cfdf1924a38cbc0d19d29ce2bdef89))
* **cli:** prepare pages entry if the page key is changed ([4c79839](https://github.com/vuepress/vuepress-next/commit/4c79839b730dd9cd9042c5929820d09ce102a88f))
* **plugin-git:** split arguments to get updated time ([70e8b5e](https://github.com/vuepress/vuepress-next/commit/70e8b5ec0e7a960ef9a2398200ff23ae67086ab9))





# [2.0.0-alpha.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-12-11)


### Bug Fixes

* **bundler-webpack:** display localhost by default in console ([8bf0987](https://github.com/vuepress/vuepress-next/commit/8bf0987b71588b2959475da9d502b2e4f9cc6bbb))
* **cli:** remove shorthand of host option ([8340797](https://github.com/vuepress/vuepress-next/commit/8340797da03462c8078753a4535a9977c349ca04))


### Features

* **plugin-pwa:** migrate pwa plugin ([aa54fd6](https://github.com/vuepress/vuepress-next/commit/aa54fd65aa77b32b97de0a38359f1ad07f96f566))
* **plugin-pwa-popup:** extract pwa popup plugin ([c3e8fb2](https://github.com/vuepress/vuepress-next/commit/c3e8fb26c348b7cae47f7cc0c4a0fba998c308d3))





# [2.0.0-alpha.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)


### Bug Fixes

* **bundler-webpack:** fix windows compatibility (close [#12](https://github.com/vuepress/vuepress-next/issues/12)) ([f35f768](https://github.com/vuepress/vuepress-next/commit/f35f76861785e69c26d3e8731d5a1afe7e2f01be))





# [2.0.0-alpha.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)


### Features

* **bundler-webpack:** migrate to webpack 5 ([37dca96](https://github.com/vuepress/vuepress-next/commit/37dca9644622a61e50ba2cda420c08581a824a19))
* **client:** remove built-in debug component ([a5962bb](https://github.com/vuepress/vuepress-next/commit/a5962bb82483f56800b33b4e35c50dcb49fd48b1))
* **plugin-debug:** add debug plugin ([ddf0a92](https://github.com/vuepress/vuepress-next/commit/ddf0a925c849fd7dba894ee69f9840d63dee99f4))
* **shared:** add esm build ([f8463e7](https://github.com/vuepress/vuepress-next/commit/f8463e791c909493e343d98468663c9d31bcbb5f))
* **theme-default:** use debug plugin ([e12b1f3](https://github.com/vuepress/vuepress-next/commit/e12b1f3293b5e8faebd93b444b71b6ac11b1029d))





# [2.0.0-alpha.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)


### Bug Fixes

* **plugin-google-analytics:** report site base ([31c8cad](https://github.com/vuepress/vuepress-next/commit/31c8cadfba7676e7ac5809d669a6262f421e7831))
* **theme-default:** fix code related styles ([83d8a6f](https://github.com/vuepress/vuepress-next/commit/83d8a6f50537ed1b4c5e5c0f4221841999eeaeab))
* **theme-default:** fix the condition of using router-link as nav-link ([8141f69](https://github.com/vuepress/vuepress-next/commit/8141f691495fc92ee19bd4d7bfd496c07112ac6a))


### Features

* **markdown:** support doc lang highlight ([dc91db6](https://github.com/vuepress/vuepress-next/commit/dc91db6327fd818f365abbec96cc5dde0b6ba243))





# [2.0.0-alpha.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)


### Bug Fixes

* **bundler-webpack:** remove spinner when preparing data ([7f3b425](https://github.com/vuepress/vuepress-next/commit/7f3b4253a6d4d2f58b3487a407c609c417be1326))
* **cli:** keep message format consistent ([1de416d](https://github.com/vuepress/vuepress-next/commit/1de416d75fb115523d78e6e709712210cbf39db9))
* **core:** failed to resolve local theme ([4d836e2](https://github.com/vuepress/vuepress-next/commit/4d836e2bc3e7affe17f63df1c4ce40c464a7e6fb))
* **core:** warn if layout directory does not exist ([3d2d414](https://github.com/vuepress/vuepress-next/commit/3d2d4148024963521b9e1ebbc29aa19697ac3452))


### Features

* **cli:** allow default export in user config file ([b2f86c7](https://github.com/vuepress/vuepress-next/commit/b2f86c7b6c11de81c5aaf6e96973921dc0b9ad60))
* **cli:** allow loading ts files globally ([a9d94ac](https://github.com/vuepress/vuepress-next/commit/a9d94ac9243ec75c5de20a0a08546e3a032dd43e))
* **utils:** add hasExportDefault util ([575a9c5](https://github.com/vuepress/vuepress-next/commit/575a9c5d9eee44c0ce20b0712830e2eb2a303780))





# [2.0.0-alpha.3](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-12-01)


### Bug Fixes

* **bundler-webpack:** check public dir before using copy-plugin ([2481802](https://github.com/vuepress/vuepress-next/commit/248180221e870a2e1cc2e4a67973c4e0918a3651))
* **core:** avoid runtime warning for empty template (close [#10](https://github.com/vuepress/vuepress-next/issues/10)) ([bcbf703](https://github.com/vuepress/vuepress-next/commit/bcbf703e6e449f7753697b7dfc503bd643bfd240))


### Features

* **cli:** use esbuild to load ts file ([41cfbc5](https://github.com/vuepress/vuepress-next/commit/41cfbc57872f00b1f8ff80ffc9b127942792fbc6))





# [2.0.0-alpha.2](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-12-01)


### Bug Fixes

* **plugin-git:** check if git repo is valid ([3e9fc83](https://github.com/vuepress/vuepress-next/commit/3e9fc8301e3fc9a0be7a8c7ede25e10063a10c9f))


### Features

* **bundler-webpack:** use esbuild for compilation and minification ([4351f99](https://github.com/vuepress/vuepress-next/commit/4351f997ffee41d560a257abd28880aa98ee29a4))





# 2.0.0-alpha.1 (2020-12-01)
