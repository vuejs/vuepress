**The exciting 0.9.0 is going to be released !** 🆙👏

<a name="0.9.0"></a>
# [0.9.0](https://github.com/vuejs/vuepress/compare/v0.8.4...v0.9.0) (2018-05-09)

This release 

### Features & Improvements

- **Default theme**: highlight current region in sidebar ([#272](https://github.com/vuejs/vuepress/issues/272)) ([6b6d268](https://github.com/vuejs/vuepress/commit/6b6d268))
- **Default theme**: `last updated` UI in default theme. ([#338](https://github.com/vuejs/vuepress/issues/338)) ([272df57](https://github.com/vuejs/vuepress/commit/272df57))
- **Build**: Using `babel` and support `JSX` in vue. (close: [#318](https://github.com/vuejs/vuepress/issues/318)) ([#336](https://github.com/vuejs/vuepress/issues/336)) ([82cd8bd](https://github.com/vuejs/vuepress/commit/82cd8bd))
- **Build**: Generate the timestamp of last updated for each doc (close [#258](https://github.com/vuejs/vuepress/issues/258)) ([#282](https://github.com/vuejs/vuepress/issues/282)) ([d9b290b](https://github.com/vuejs/vuepress/commit/d9b290b))
- **Build**: Bump up `webpack` to 4.8.1 (close: [#309](https://github.com/vuejs/vuepress/issues/309)) ([9e3f005](https://github.com/vuejs/vuepress/commit/9e3f005))
- **Config**: Support disable navbar globally ([#246](https://github.com/vuejs/vuepress/issues/246)) ([e725ad2](https://github.com/vuejs/vuepress/commit/e725ad2))
- **Config**: Support global markdown config for attributes of external links ([#358](https://github.com/vuejs/vuepress/issues/358)) ([20e5bd8](https://github.com/vuejs/vuepress/commit/20e5bd8))
- **Config**: Support hide edit link by page (close: [#284](https://github.com/vuejs/vuepress/issues/284)) ([#286](https://github.com/vuejs/vuepress/issues/286)) ([d46819c](https://github.com/vuejs/vuepress/commit/d46819c))
- Handle telephone links ([#325](https://github.com/vuejs/vuepress/issues/325)) ([087467a](https://github.com/vuejs/vuepress/commit/087467a))
- Header extraction improvement (close: [#238](https://github.com/vuejs/vuepress/issues/238)) ([#271](https://github.com/vuejs/vuepress/issues/271)) ([53c8489](https://github.com/vuejs/vuepress/commit/53c8489))
- Make code type insensitive (close: [#347](https://github.com/vuejs/vuepress/issues/347)) ([5e87b65](https://github.com/vuejs/vuepress/commit/5e87b65))

### Bug Fixes

* $page is missing at 404 page ([#388](https://github.com/vuejs/vuepress/issues/388)) ([cefc8c3](https://github.com/vuejs/vuepress/commit/cefc8c3))
* avoid the searchbox exceeded out of screen in narrow screen ([#254](https://github.com/vuejs/vuepress/issues/254)) ([8f04081](https://github.com/vuejs/vuepress/commit/8f04081))
* code looks not good at small sreen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([6514c8f](https://github.com/vuejs/vuepress/commit/6514c8f))
* code looks not good at small sreen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([d0ef06f](https://github.com/vuejs/vuepress/commit/d0ef06f))
* dropdown overlap due to word wrapping (close: [#359](https://github.com/vuejs/vuepress/issues/359)) ([#360](https://github.com/vuejs/vuepress/issues/360)) ([c65a8b7](https://github.com/vuejs/vuepress/commit/c65a8b7))
* duplicate slash when docs dir is not set ([#361](https://github.com/vuejs/vuepress/issues/361)) ([0c59ed5](https://github.com/vuejs/vuepress/commit/0c59ed5))
* ensure `<script>` blocks in SFCs in node_modules are transpiled ([4bf56d7](https://github.com/vuejs/vuepress/commit/4bf56d7))
* glob patterns error on windows (close: [#348](https://github.com/vuejs/vuepress/issues/348)) ([#400](https://github.com/vuejs/vuepress/issues/400)) ([ab53998](https://github.com/vuejs/vuepress/commit/ab53998))
* image overflow at custom content (close: [#381](https://github.com/vuejs/vuepress/issues/381)) ([#383](https://github.com/vuejs/vuepress/issues/383)) ([145cf4f](https://github.com/vuejs/vuepress/commit/145cf4f))
* index file judgement bug (close: [#306](https://github.com/vuejs/vuepress/issues/306)) ([#308](https://github.com/vuejs/vuepress/issues/308)) ([fefa16c](https://github.com/vuejs/vuepress/commit/fefa16c))
* missing title and desc in 404 and custom theme. ([fcaee80](https://github.com/vuejs/vuepress/commit/fcaee80))
* postcss-loader warnings (close: [#278](https://github.com/vuejs/vuepress/issues/278)) ([34c7f99](https://github.com/vuejs/vuepress/commit/34c7f99))
* potential duplicate iteration keys at dropdown ([#249](https://github.com/vuejs/vuepress/issues/249)) ([1417a35](https://github.com/vuejs/vuepress/commit/1417a35))
* relative link checking ([31b8feb](https://github.com/vuejs/vuepress/commit/31b8feb))
* remove style override limitation to custom theme (close: 404) ([#405](https://github.com/vuejs/vuepress/issues/405)) ([69bd59d](https://github.com/vuejs/vuepress/commit/69bd59d))
* resolve custom theme from global cli (close: [#392](https://github.com/vuejs/vuepress/issues/392)) ([#399](https://github.com/vuejs/vuepress/issues/399)) ([01142df](https://github.com/vuejs/vuepress/commit/01142df))
* title cannot be number at front matter ([#297](https://github.com/vuejs/vuepress/issues/297)) ([5023d19](https://github.com/vuejs/vuepress/commit/5023d19))
* unexpected scroll behavior after clicking sidebar links ([#298](https://github.com/vuejs/vuepress/issues/298)) ([6081a3d](https://github.com/vuejs/vuepress/commit/6081a3d))
* unexpected top blank space when navbar is disable ([#316](https://github.com/vuejs/vuepress/issues/316)) ([2bdc68e](https://github.com/vuejs/vuepress/commit/2bdc68e))
