## [1.8.2](https://github.com/vuejs/vuepress/compare/v1.8.1...v1.8.2) (2021-02-18)


### Bug Fixes

* **$default-theme:** sidebar groups are not opened when directly navigating to these pages (fix [#2564](https://github.com/vuejs/vuepress/issues/2564)) ([#2565](https://github.com/vuejs/vuepress/issues/2565)) ([3ab9fca](https://github.com/vuejs/vuepress/commit/3ab9fca))
* **$markdown:** support path without file extension when importing code snippets ([#2677](https://github.com/vuejs/vuepress/issues/2677)) ([bb4ae4e](https://github.com/vuejs/vuepress/commit/bb4ae4e))



## [1.8.1](https://github.com/vuejs/vuepress/compare/v1.8.0...v1.8.1) (2021-02-11)


### Bug Fixes

* **$core:** component CodeGroup loads correctly on clientfix [#2711](https://github.com/vuejs/vuepress/issues/2711) ([#2794](https://github.com/vuejs/vuepress/issues/2794)) ([51277f8](https://github.com/vuejs/vuepress/commit/51277f8))
* **$theme-default:** override algoliaOptions correctly ([ba89f39](https://github.com/vuejs/vuepress/commit/ba89f39))
* **deps:** [security] bump ini from 1.3.5 to 1.3.8 ([aeb8dce](https://github.com/vuejs/vuepress/commit/aeb8dce))
* **deps:** bump autoprefixer from 9.6.1 to 9.8.6 ([775b3de](https://github.com/vuejs/vuepress/commit/775b3de))
* **deps:** bump vue from 2.6.10 to 2.6.12 ([830dd4c](https://github.com/vuejs/vuepress/commit/830dd4c))



# [1.8.0](https://github.com/vuejs/vuepress/compare/v1.7.1...v1.8.0) (2021-01-05)


### Bug Fixes

* **$plugin-google-analytics:** report site base ([#2687](https://github.com/vuejs/vuepress/issues/2687)) (close [#2169](https://github.com/vuejs/vuepress/issues/2169)) ([6bbcc69](https://github.com/vuejs/vuepress/commit/6bbcc69))
* **$shared-utils:** improve title inference and header extraction for markdown links syntax ([d264e50](https://github.com/vuejs/vuepress/commit/d264e50))
* **$theme-default:** display header-anchor links when using keyboard navigation ([#2699](https://github.com/vuejs/vuepress/issues/2699)) ([81cce39](https://github.com/vuejs/vuepress/commit/81cce39))
* Only empty the `.temp` directory at most once per run (fix [#2254](https://github.com/vuejs/vuepress/issues/2254)) ([#2612](https://github.com/vuejs/vuepress/issues/2612)) ([970b434](https://github.com/vuejs/vuepress/commit/970b434))


### Features

* **$markdown:** make page suffix configurable (close [#2452](https://github.com/vuejs/vuepress/issues/2452)) ([#2674](https://github.com/vuejs/vuepress/issues/2674)) ([db16389](https://github.com/vuejs/vuepress/commit/db16389))



## [1.7.1](https://github.com/vuejs/vuepress/compare/v1.7.0...v1.7.1) (2020-10-15)


### Bug Fixes

* **$core:** add missing styles for OutboundLink ([#2662](https://github.com/vuejs/vuepress/issues/2662)) ([e2b6641](https://github.com/vuejs/vuepress/commit/e2b6641))
* **$core:** reference correct canonical Url frontmatter property (fix [#2665](https://github.com/vuejs/vuepress/issues/2665)) ([fbf5e5d](https://github.com/vuejs/vuepress/commit/fbf5e5d))



# [1.7.0](https://github.com/vuejs/vuepress/compare/v1.6.0...v1.7.0) (2020-10-13)


### Bug Fixes

* **$core:** [#2627](https://github.com/vuejs/vuepress/issues/2627) Dup ID violates HTML5-4 ([#2650](https://github.com/vuejs/vuepress/issues/2650)) ([931e7d9](https://github.com/vuejs/vuepress/commit/931e7d9))
* adds accessibility to code-group component ([#2630](https://github.com/vuejs/vuepress/issues/2630)) ([35865ec](https://github.com/vuejs/vuepress/commit/35865ec))
* scroll hash encoded when non-english chars are used fix [#2633](https://github.com/vuejs/vuepress/issues/2633) ([#2639](https://github.com/vuejs/vuepress/issues/2639)) ([5fcbd88](https://github.com/vuejs/vuepress/commit/5fcbd88))
* textlint bug causing PR's to fail checks fix [#2636](https://github.com/vuejs/vuepress/issues/2636) ([#2637](https://github.com/vuejs/vuepress/issues/2637)) ([64e92ca](https://github.com/vuejs/vuepress/commit/64e92ca))


### Features

* **$core:** add canonical link to frontmatter ([#2658](https://github.com/vuejs/vuepress/issues/2658)) ([ff6c51a](https://github.com/vuejs/vuepress/commit/ff6c51a))



# [1.6.0](https://github.com/vuejs/vuepress/compare/v1.5.4...v1.6.0) (2020-09-25)


### Features

* **$theme-default:** add code group and code block components ([#2594](https://github.com/vuejs/vuepress/issues/2594)) ([394c4f6](https://github.com/vuejs/vuepress/commit/394c4f6))
* **$theme-default:** inform screen readers link opens in new tab/window (fix [#2601](https://github.com/vuejs/vuepress/issues/2601)) ([#2603](https://github.com/vuejs/vuepress/issues/2603)) ([8d10119](https://github.com/vuejs/vuepress/commit/8d10119))



## [1.5.4](https://github.com/vuejs/vuepress/compare/v1.5.3...v1.5.4) (2020-08-23)


### Bug Fixes

* **$core:** decode regularPath when generate router config (fix [#1946](https://github.com/vuejs/vuepress/issues/1946)) ([#1947](https://github.com/vuejs/vuepress/issues/1947)) ([dd26c7c](https://github.com/vuejs/vuepress/commit/dd26c7c))
* **$shared-utils:** fix date parse logic for permalinks ([#2181](https://github.com/vuejs/vuepress/issues/2181)) ([d4d0380](https://github.com/vuejs/vuepress/commit/d4d0380))
* **$shared-utils:** replace diacritics with regex ([#1855](https://github.com/vuejs/vuepress/issues/1855)) ([a03e93d](https://github.com/vuejs/vuepress/commit/a03e93d))
* **$theme-default:** overlap navbar dropdown menus (fix [#2227](https://github.com/vuejs/vuepress/issues/2227)) ([#2365](https://github.com/vuejs/vuepress/issues/2365)) ([ceb0fa9](https://github.com/vuejs/vuepress/commit/ceb0fa9))
* **$theme-default:** remove invalidate aria-labelledby on homepage title([#2277](https://github.com/vuejs/vuepress/issues/2277)) ([94a7de4](https://github.com/vuejs/vuepress/commit/94a7de4))



## [1.5.3](https://github.com/vuejs/vuepress/compare/v1.5.2...v1.5.3) (2020-08-05)


### Bug Fixes

* **$theme-default:** fix editLink for repos hosted on gitlab.com ([#2523](https://github.com/vuejs/vuepress/issues/2523)) ([1c3967c](https://github.com/vuejs/vuepress/commit/1c3967c))
* add toml dependencyt to shared-utils ([b858a6e](https://github.com/vuejs/vuepress/commit/b858a6e))
* regular files should not be executable ([#2535](https://github.com/vuejs/vuepress/issues/2535)) ([ffb8527](https://github.com/vuejs/vuepress/commit/ffb8527))
* **$theme-default:** improve last-updated text color contrast ([#2282](https://github.com/vuejs/vuepress/issues/2282)) ([7ca9fbc](https://github.com/vuejs/vuepress/commit/7ca9fbc))
* allows no rel attribute on external links in the nav ([#2338](https://github.com/vuejs/vuepress/issues/2338)) ([b343cd3](https://github.com/vuejs/vuepress/commit/b343cd3))
* **$core:**  style loss under build  for package that specifies `sideEffects: false` (fix [#2350](https://github.com/vuejs/vuepress/issues/2350)) ([#2471](https://github.com/vuejs/vuepress/issues/2471)) ([7e29900](https://github.com/vuejs/vuepress/commit/7e29900))
* **$markdown:** line highlighting not working correctly when importing code snippets ([#2441](https://github.com/vuejs/vuepress/issues/2441)) ([d0f2e42](https://github.com/vuejs/vuepress/commit/d0f2e42))


### Features

* **$theme-default:** add initial open group index option ([#2408](https://github.com/vuejs/vuepress/issues/2408)) ([465ae40](https://github.com/vuejs/vuepress/commit/465ae40))



## [1.5.2](https://github.com/vuejs/vuepress/compare/v1.5.1...v1.5.2) (2020-06-14)


### Bug Fixes

* **$core:** check if meta is from head before removing it ([#2403](https://github.com/vuejs/vuepress/issues/2403)) ([3c94f71](https://github.com/vuejs/vuepress/commit/3c94f71))
* **$theme-default:** handle algolia search result with Chinese hash (close: [#2431](https://github.com/vuejs/vuepress/issues/2431)) ([#2432](https://github.com/vuejs/vuepress/issues/2432)) ([6183840](https://github.com/vuejs/vuepress/commit/6183840))


### Features

* **$theme-default:** allow 'auto' in defined sidebars (close: [#1252](https://github.com/vuejs/vuepress/issues/1252)) ([#2380](https://github.com/vuejs/vuepress/issues/2380)) ([597f83b](https://github.com/vuejs/vuepress/commit/597f83b))



## [1.5.1](https://github.com/vuejs/vuepress/compare/v1.5.0...v1.5.1) (2020-06-09)


### Bug Fixes

* **$core**: HMR issue caused by chokidar v3 (close: [#2392](https://github.com/vuejs/vuepress/issues/2392)) ([#2436](https://github.com/vuejs/vuepress/issues/2392)) ([7e9d0c1](https://github.com/vuejs/vuepress/commit/7e9d0c1f42196dee52daabfaf796e0cdaa7bd6eb))
* **$shared-utils:** use title variable for homepage (close: [#2247](https://github.com/vuejs/vuepress/issues/2247)) ([#2307](https://github.com/vuejs/vuepress/issues/2307)) ([869eb8d](https://github.com/vuejs/vuepress/commit/869eb8d))



# [1.5.0](https://github.com/vuejs/vuepress/compare/v1.4.1...v1.5.0) (2020-05-11)


### Bug Fixes

* **$core:** include polyfills correctly (close [#1168](https://github.com/vuejs/vuepress/issues/1168)) ([#2317](https://github.com/vuejs/vuepress/issues/2317)) ([69c193a](https://github.com/vuejs/vuepress/commit/69c193a))
* **$core:** no dynamic import style ([#1490](https://github.com/vuejs/vuepress/issues/1490)) ([c80c36b](https://github.com/vuejs/vuepress/commit/c80c36b))


### Features

* **$markdown:** snippet partial import ([#2225](https://github.com/vuejs/vuepress/issues/2225)) ([2f1327b](https://github.com/vuejs/vuepress/commit/2f1327b))


### Reverts

* **fix($theme-default)**: close dropdown on mouseout (fix [#2227](https://github.com/vuejs/vuepress/issues/2227))" ([f54b389](https://github.com/vuejs/vuepress/commit/f54b389))



## [1.4.1](https://github.com/vuejs/vuepress/compare/v1.4.0...v1.4.1) (2020-04-15)


### Bug Fixes

* **$core:** missing 404 page (close [#2248](https://github.com/vuejs/vuepress/issues/2248)) ([#2250](https://github.com/vuejs/vuepress/issues/2250)) ([28a4eab](https://github.com/vuejs/vuepress/commit/28a4eab))
* **$core:** duplicate meta tags ([#2164](https://github.com/vuejs/vuepress/issues/2164)) ([01cd096](https://github.com/vuejs/vuepress/commit/01cd096))
* **$plugin-search:** match non-ASCII chars (close [#2242](https://github.com/vuejs/vuepress/issues/2242)) ([#2283](https://github.com/vuejs/vuepress/issues/2283)) ([9f3f49c](https://github.com/vuejs/vuepress/commit/9f3f49c))
* **$shared-utils:** fail to resolve markdown-it plugins (close [#2286](https://github.com/vuejs/vuepress/issues/2286))([#2289](https://github.com/vuejs/vuepress/issues/2289)) ([16df156](https://github.com/vuejs/vuepress/commit/16df156))
* **$theme-default:** close dropdown on mouseout (fix [#2227](https://github.com/vuejs/vuepress/issues/2227)) ([#2303](https://github.com/vuejs/vuepress/issues/2303)) ([430b917](https://github.com/vuejs/vuepress/commit/430b917))



# [1.4.0](https://github.com/vuejs/vuepress/compare/v1.3.1...v1.4.0) (2020-03-18)


### Bug Fixes

* **$plugin-pwa:** work with register-service-worker 1.7.0 (close [#2222](https://github.com/vuejs/vuepress/issues/2222)) ([#2229](https://github.com/vuejs/vuepress/issues/2229)) ([604052b](https://github.com/vuejs/vuepress/commit/604052b))
* **$shared-utils:** Slugify em/en dash in urls ([#2174](https://github.com/vuejs/vuepress/issues/2174)) ([8d9968d](https://github.com/vuejs/vuepress/commit/8d9968d))
* **$theme-default:** remove error logs for nested sidebar groups ([#2191](https://github.com/vuejs/vuepress/issues/2191)) ([c3a943c](https://github.com/vuejs/vuepress/commit/c3a943c))
* **$test-utils:** fail to test specific package ([#2099](https://github.com/vuejs/vuepress/issues/2099)) ([0aadf05](https://github.com/vuejs/vuepress/commit/0aadf05))


### Features

* **$core:** Improve VuePress build time ([#2163](https://github.com/vuejs/vuepress/issues/2163)) ([76da780](https://github.com/vuejs/vuepress/commit/76da780))
* **$plugin-last-updated:** add dateOptions to options ([#2192](https://github.com/vuejs/vuepress/issues/2192)) ([369c315](https://github.com/vuejs/vuepress/commit/369c315))
* **$plugin-search:** improve the native search algorithm ([#1557](https://github.com/vuejs/vuepress/issues/1557)) ([e9fde5c](https://github.com/vuejs/vuepress/commit/e9fde5c))



## [1.3.1](https://github.com/vuejs/vuepress/compare/v1.3.0...v1.3.1) (2020-02-20)


### Bug Fixes

* **$core:** resolve jsx files by default (close [#2058](https://github.com/vuejs/vuepress/issues/2058)) ([#2059](https://github.com/vuejs/vuepress/issues/2059)) ([f083d8d](https://github.com/vuejs/vuepress/commit/f083d8d))
* **$core:** transpile vuepress packages and md files (close [#1606](https://github.com/vuejs/vuepress/issues/1606), [#1990](https://github.com/vuejs/vuepress/issues/1990)) ([#2064](https://github.com/vuejs/vuepress/issues/2064)) ([0ca620f](https://github.com/vuejs/vuepress/commit/0ca620f))
* **$plugin-pwa:** popup component does not work (close [#2172](https://github.com/vuejs/vuepress/issues/2172)) ([#2187](https://github.com/vuejs/vuepress/issues/2187)) ([560b3c6](https://github.com/vuejs/vuepress/commit/560b3c6))
* **$theme-default:** non-ASCII hash causes wrong sidebar highlight (close [#2078](https://github.com/vuejs/vuepress/issues/2078))([#2166](https://github.com/vuejs/vuepress/issues/2166)) ([ca3679c](https://github.com/vuejs/vuepress/commit/ca3679c))


### Features

* **$core:** support async enhanceApp (close [#2074](https://github.com/vuejs/vuepress/issues/2074)) ([#2075](https://github.com/vuejs/vuepress/issues/2075)) ([2d53fbb](https://github.com/vuejs/vuepress/commit/2d53fbb))



# [1.3.0](https://github.com/vuejs/vuepress/compare/v1.2.0...v1.3.0) (2020-01-30)


### Bug Fixes

* **$cli:** update known command list ([#2146](https://github.com/vuejs/vuepress/issues/2146)) ([2b25740](https://github.com/vuejs/vuepress/commit/2b25740))
* **$cli:** inferUserDocsDirectory ignore all node_modules ([#2137](https://github.com/vuejs/vuepress/issues/2137)) ([df59909](https://github.com/vuejs/vuepress/commit/df59909))
* **$core:** set NODE_ENV before creating app ([#1972](https://github.com/vuejs/vuepress/issues/1972)) ([245be8d](https://github.com/vuejs/vuepress/commit/245be8d))
* **$core:** temp option in siteConfig has not effect (fix [#2038](https://github.com/vuejs/vuepress/issues/2038)) ([#2040](https://github.com/vuejs/vuepress/issues/2040)) ([0bb85a4](https://github.com/vuejs/vuepress/commit/0bb85a4))
* **$default-theme:** deep sidebar links rendenring ([#1973](https://github.com/vuejs/vuepress/issues/1973)) ([0e5519a](https://github.com/vuejs/vuepress/commit/0e5519a))
* **$docs:** Fixed typo ([#1997](https://github.com/vuejs/vuepress/issues/1997)) ([7d6e420](https://github.com/vuejs/vuepress/commit/7d6e420))
* **$docs:** Uniforming VuePress labels in documentation (fix [#1998](https://github.com/vuejs/vuepress/issues/1998)) ([6a84126](https://github.com/vuejs/vuepress/commit/6a84126))
* **$markdown:** Fix four spaces codeblocks rendering (Closes [#1921](https://github.com/vuejs/vuepress/issues/1921)) ([#1958](https://github.com/vuejs/vuepress/issues/1958)) ([7bc5825](https://github.com/vuejs/vuepress/commit/7bc5825))
* **$plugin-google-analytics:** duplicate tracking of first page (fix [#2017](https://github.com/vuejs/vuepress/issues/2017)) ([#2039](https://github.com/vuejs/vuepress/issues/2039)) ([a69df21](https://github.com/vuejs/vuepress/commit/a69df21))
* **$plugin-pwa:** no global-ui-component when updatePopup is disabled ([#2041](https://github.com/vuejs/vuepress/issues/2041)) ([6f9e478](https://github.com/vuejs/vuepress/commit/6f9e478))
* **$shared-utils:** Add curly quotes to rSpecial ([#1934](https://github.com/vuejs/vuepress/issues/1934)) ([28a0ed9](https://github.com/vuejs/vuepress/commit/28a0ed9))
* **$theme-default:** close dropdown-links when focusout on the last item (close [#1948](https://github.com/vuejs/vuepress/issues/1948)) ([#1952](https://github.com/vuejs/vuepress/issues/1952)) ([cd72acc](https://github.com/vuejs/vuepress/commit/cd72acc))
* **$theme-default:** slots don't allow customization for Sidebar & Page (close: [#1950](https://github.com/vuejs/vuepress/issues/1950)) ([#1951](https://github.com/vuejs/vuepress/issues/1951)) ([890e85d](https://github.com/vuejs/vuepress/commit/890e85d))
* **$theme-default:** use alias for nested SidebarLinks (close [#2049](https://github.com/vuejs/vuepress/issues/2049)) ([ceccca3](https://github.com/vuejs/vuepress/commit/ceccca3))
* **$theme-default:** wrong algolia search route with base config ([#2007](https://github.com/vuejs/vuepress/issues/2007)) ([b00b277](https://github.com/vuejs/vuepress/commit/b00b277))


### Features

* **$cli:** Notify users of a newer release ([#2121](https://github.com/vuejs/vuepress/issues/2121)) ([7a09a72](https://github.com/vuejs/vuepress/commit/7a09a72))
* **$cli:** run debug mode without clearing screen (close [#2100](https://github.com/vuejs/vuepress/issues/2100)) ([#2116](https://github.com/vuejs/vuepress/issues/2116)) ([c6a3cb5](https://github.com/vuejs/vuepress/commit/c6a3cb5))
* **$core:** Add generator meta tag to ssr index.html template ([#2133](https://github.com/vuejs/vuepress/issues/2133)) ([2826cd7](https://github.com/vuejs/vuepress/commit/2826cd7))
* **$theme-default:** add variable to config HomePage width (close [#2055](https://github.com/vuejs/vuepress/issues/2055)) ([#2086](https://github.com/vuejs/vuepress/issues/2086)) ([b72d145](https://github.com/vuejs/vuepress/commit/b72d145))
* **$config:** Allow overriding badges colors (close [#1940](https://github.com/vuejs/vuepress/issues/1940)) ([#1941](https://github.com/vuejs/vuepress/issues/1941)) ([89a4a8d](https://github.com/vuejs/vuepress/commit/89a4a8d))
* **$markdown:** `extractHeaders` option (close: [#1903](https://github.com/vuejs/vuepress/issues/1903)) ([#1945](https://github.com/vuejs/vuepress/issues/1945)) ([d2fef5d](https://github.com/vuejs/vuepress/commit/d2fef5d))
* **$markdown:** Support for Rust file extension ([73089a0](https://github.com/vuejs/vuepress/commit/73089a0))
* **$theme-default:** allow optional subtitle ([#1981](https://github.com/vuejs/vuepress/issues/1981)) ([a28804c](https://github.com/vuejs/vuepress/commit/a28804c))
* **$theme-default:** external links in prev/next (close [#1962](https://github.com/vuejs/vuepress/issues/1962))([#1984](https://github.com/vuejs/vuepress/issues/1984)) ([9f28814](https://github.com/vuejs/vuepress/commit/9f28814))
* **$theme-default:** markdown details custom block (close [#768](https://github.com/vuejs/vuepress/issues/768)) ([#2044](https://github.com/vuejs/vuepress/issues/2044)) ([7f2a997](https://github.com/vuejs/vuepress/commit/7f2a997))
* **$theme-default:** Support configuring target and rel for nav links (close [#1353](https://github.com/vuejs/vuepress/issues/1353)) ([#1734](https://github.com/vuejs/vuepress/issues/1734)) ([770ba72](https://github.com/vuejs/vuepress/commit/770ba72))



# [1.2.0](https://github.com/vuejs/vuepress/compare/v1.1.0...v1.2.0) (2019-10-11)


### Bug Fixes

* **$core:** optimize error log (close: [#1296](https://github.com/vuejs/vuepress/issues/1296)) ([#1413](https://github.com/vuejs/vuepress/issues/1413)) ([51de6cf](https://github.com/vuejs/vuepress/commit/51de6cf))
* **$markdown:** notify error when not found snippet (close: [#1872](https://github.com/vuejs/vuepress/issues/1872)) ([#1910](https://github.com/vuejs/vuepress/issues/1910)) ([6aaa7d7](https://github.com/vuejs/vuepress/commit/6aaa7d7))
* **$theme-default:** regression of arrow spacing consistent (close: [#1427](https://github.com/vuejs/vuepress/issues/1427)) ([#1907](https://github.com/vuejs/vuepress/issues/1907)) ([dbda574](https://github.com/vuejs/vuepress/commit/dbda574))
* **$theme-default:** make dropdown-title's UI consistent with nav-link ([#1890](https://github.com/vuejs/vuepress/issues/1890)) ([757e880](https://github.com/vuejs/vuepress/commit/757e880))
* **$theme-default:** make navbar dropdown links accessible ([#1837](https://github.com/vuejs/vuepress/issues/1837)) ([a8ce645](https://github.com/vuejs/vuepress/commit/a8ce645))
* **$theme-default:** regression of custom container default title ([#1875](https://github.com/vuejs/vuepress/issues/1875)) ([e0ef407](https://github.com/vuejs/vuepress/commit/e0ef407))


### Features

* **$core:** config "pattern" of resolved files (close: [#1700](https://github.com/vuejs/vuepress/issues/1700))([#1705](https://github.com/vuejs/vuepress/issues/1705)) ([1f3e4e2](https://github.com/vuejs/vuepress/commit/1f3e4e2))
* **$core:** support async function exported in vuepress config (close: [#1185](https://github.com/vuejs/vuepress/issues/1185)) ([#1925](https://github.com/vuejs/vuepress/issues/1925)) ([cdbfd75](https://github.com/vuejs/vuepress/commit/cdbfd75))
* **$core:** Upgrade vue version to `2.6.10` ([#1876](https://github.com/vuejs/vuepress/issues/1876)) ([c17c70e](https://github.com/vuejs/vuepress/commit/c17c70e))
* **$theme-default:** smooth scroll (close [#567](https://github.com/vuejs/vuepress/issues/567)) ([#1881](https://github.com/vuejs/vuepress/issues/1881)) ([2e3efb4](https://github.com/vuejs/vuepress/commit/2e3efb4))
* **$theme-default:**: enable editLink on specific page via frontmatter (close: [#1762]((https://github.com/vuejs/vuepress/issues/1825))) ([#1825](https://github.com/vuejs/vuepress/issues/1825)) ([0e8a442](https://github.com/vuejs/vuepress/commit/0e8a442))
* **$markdown:** Highlight `kotlin` code on snippets import (close: [#1831](https://github.com/vuejs/vuepress/issues/1831))([#1874](https://github.com/vuejs/vuepress/issues/1874)) ([f913fea](https://github.com/vuejs/vuepress/commit/f913fea))
* **$shared-utils:** resolve regularPath when getting permalink ([#1786](https://github.com/vuejs/vuepress/issues/1786)) ([c6ce6cf](https://github.com/vuejs/vuepress/commit/c6ce6cf))


# [1.1.0](https://github.com/vuejs/vuepress/compare/v1.0.4...v1.1.0) (2019-09-14)


### Bug Fixes

* **$security:** fix Security issue by bump js yaml version (close: [#1845](https://github.com/vuejs/vuepress/issues/1845)) ([#1846](https://github.com/vuejs/vuepress/issues/1846)) ([696717b](https://github.com/vuejs/vuepress/commit/696717b))
* **$theme-default** Search box max suggestions ([#1728](https://github.com/vuejs/vuepress/issues/1728)) ([ade328f](https://github.com/vuejs/vuepress/commit/ade328f))
* **$last-updated:** use file author time instead of submodule commit time ([#1640](https://github.com/vuejs/vuepress/issues/1640)) ([f964391](https://github.com/vuejs/vuepress/commit/f964391))
* **$theme-default:** add text ellipsis to navbar ([#1683](https://github.com/vuejs/vuepress/issues/1683)) ([#1840](https://github.com/vuejs/vuepress/issues/1840)) ([74017c5](https://github.com/vuejs/vuepress/commit/74017c5))
* **$theme-default:** Expand nested sidebar groups ([#1540](https://github.com/vuejs/vuepress/issues/1540)) ([eb231bf](https://github.com/vuejs/vuepress/commit/eb231bf))


### Features

* **core:** make extendPageData async ready without breaking changes ([#1546](https://github
.com/vuejs/vuepress/issues/1546)) ([543fd6c](https://github.com/vuejs/vuepress/commit/543fd6c))
* **$core:** better error log for layouts ([#1455](https://github.com/vuejs/vuepress/issues/1455)) ([3b68913](https://github.com/vuejs/vuepress/commit/3b68913))
* **$plugin-search:** add support for search hotkeys ([#1848](https://github.com/vuejs/vuepress/issues/1848))
([1ba06ae](https://github.com/vuejs/vuepress/commit/1ba06ae))




## [1.0.4](https://github.com/vuejs/vuepress/compare/v1.0.3...v1.0.4) (2019-09-06)


### Bug Fixes

* **$core:** Do not transpile core packages' dependencies ([b69b107](https://github.com/vuejs/vuepress/commit/b69b107))
* **$core:** Add missing hash in [#1706](https://github.com/vuejs/vuepress/issues/1706) ([#1780](https://github.com/vuejs/vuepress/issues/1780)) ([25777e4](https://github.com/vuejs/vuepress/commit/25777e4))


### Features

* **$core:** Use any custom protocol for outboundRE ([#1731](https://github.com/vuejs/vuepress/issues/1731)) ([120d885](https://github.com/vuejs/vuepress/commit/120d885))
* **$theme-default:** Disable next and prev links from global config ([#1761](https://github.com/vuejs/vuepress/issues/1761)) ([92a1c02](https://github.com/vuejs/vuepress/commit/92a1c02))






## [1.0.3](https://github.com/vuejs/vuepress/compare/v1.0.2...v1.0.3) (2019-07-29)


### Bug Fixes

* **$core:** `'[Vue warn]: Unknown custom element'` when using `<Content />` in a custom page without markdown ([#1699](https://github.com/vuejs/vuepress/issues/1699)) ([2a59800](https://github.com/vuejs/vuepress/commit/2a59800)), closes [#1173](https://github.com/vuejs/vuepress/issues/1173) [#1426](https://github.com/vuejs/vuepress/issues/1426)
* **$core:** prioritise vuepress dependencies over cwd node_modules (close: [#1708](https://github.com/vuejs/vuepress/issues/1708)) ([#1720](https://github.com/vuejs/vuepress/issues/1720)) ([52f421b](https://github.com/vuejs/vuepress/commit/52f421b))
* **$core:** transpile all scripts under core (close: [#1623](https://github.com/vuejs/vuepress/issues/1623)) ([#1685](https://github.com/vuejs/vuepress/issues/1685)) ([6460b0c](https://github.com/vuejs/vuepress/commit/6460b0c))
* **$plugin-medium-zoom:** disable zoom for links ([#1719](https://github.com/vuejs/vuepress/issues/1719)) ([e3393e3](https://github.com/vuejs/vuepress/commit/e3393e3))
* **$theme-default:** `sidebarDepth: 0` not working in YAML frontmatter (close: [#1701](https://github.com/vuejs/vuepress/issues/1701)) ([#1702](https://github.com/vuejs/vuepress/issues/1702)) ([0624828](https://github.com/vuejs/vuepress/commit/0624828))


### Features

* **$theme-default:** support custom URL scheme for external links ([#1677](https://github.com/vuejs/vuepress/issues/1677)) ([27f005b](https://github.com/vuejs/vuepress/commit/27f005b))
* **$theme-default:** use router for Algolia search to reach no refresh ([#1706](https://github.com/vuejs/vuepress/issues/1706)) ([644142b](https://github.com/vuejs/vuepress/commit/644142b))



## [1.0.2](https://github.com/vuejs/vuepress/compare/v1.0.1...v1.0.2) (2019-06-22)


### Bug Fixes

* **$core:** cannot resolve agreement file from parent theme ([1aaa6e3](https://github.com/vuejs/vuepress/commit/1aaa6e3))
* **$core:** url display in dev log ([#1670](https://github.com/vuejs/vuepress/issues/1670)) ([17ba325](https://github.com/vuejs/vuepress/commit/17ba325))
* **$plugin-medium-zoom:** doesn't work with default plugin options in default theme ([42f19e0](https://github.com/vuejs/vuepress/commit/42f19e0))


### Features

* **$plugin-medium-zoom:** custom options ([#1649](https://github.com/vuejs/vuepress/issues/1649)) ([54bb2f3](https://github.com/vuejs/vuepress/commit/54bb2f3))



## [1.0.1](https://github.com/vuejs/vuepress/compare/v1.0.0...v1.0.1) (2019-06-10)


### Bug Fixes

* **$theme-default:** using '.theme-default-content' to replace '.content' in 404 layout ([#1646](https://github.com/vuejs/vuepress/issues/1646)) ([f0d1344](https://github.com/vuejs/vuepress/commit/f0d1344))


### Features

* **$theme-default:** enhance the styles of `blockquote` ([9d20d5f](https://github.com/vuejs/vuepress/commit/9d20d5f))


# [1.0.0](https://github.com/vuejs/vuepress/compare/v1.0.0-rc.1...v1.0.0) (2019-06-08)



# [1.0.0-rc.1](https://github.com/vuejs/vuepress/compare/v1.0.0-beta.2...v1.0.0-rc.1) (2019-06-08)

It seems no any changes here.

<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/vuejs/vuepress/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2019-06-05)


### Bug Fixes

* **$core:** failed to render `<Content />` with dynamic pageKey from current $page. ([83b02ba](https://github.com/vuejs/vuepress/commit/83b02ba))



<a name=""></a>
# [](https://github.com/vuejs/vuepress/compare/v1.0.0-beta.1...v) (2019-06-05)


<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.50...v1.0.0-beta.1) (2019-06-04)

### Features

* **New Blog Plugin**: [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-plugin-blog)
  * A VuePress Blog Theme implemented in around 70 lines**: https://github.com/ulivz/70-lines-of-vuepress-blog-theme

* **Default Blog Theme**: [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-theme-blog)
  * Live Example: http://example.vuepress-theme-blog.ulivz.com

### BREAKING CHANGES

* Deprecated `@vuepress/plugin-blog` at alpha stage. ([10dfb66](https://github.com/vuejs/vuepress/commit/10dfb66))
* Deprecated `@vuepress/plugin-pagination` at alpha stage. ([3722192](https://github.com/vuejs/vuepress/commit/3722192))

<a name="1.0.0-alpha.50"></a>
# [1.0.0-alpha.50](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.49...v1.0.0-alpha.50) (2019-06-04)


### Bug Fixes

* **$core:** window is not defined ([d30e078](https://github.com/vuejs/vuepress/commit/d30e078))

<a name="1.0.0-alpha.49"></a>
# [1.0.0-alpha.49](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.48...v1.0.0-alpha.49) (2019-06-03)


### Bug Fixes

* **$core:** cannot load theme with shortcut. ([7eed1f4](https://github.com/vuejs/vuepress/commit/7eed1f4))
* **$core:** cannot retrieve the correct theme name when them path is a local absolute path linked to a javascript file. ([50f64b4](https://github.com/vuejs/vuepress/commit/50f64b4))


### Features

* **$core:** global variable "__VUEPRESS__" to store runtime key infos ([bd0bdf9](https://github.com/vuejs/vuepress/commit/bd0bdf9))
* **$core:** safer class name of content outlet ([7d0542e](https://github.com/vuejs/vuepress/commit/7d0542e))
* **$theme-default:** using '.theme-default-content' to replace '.content' in `<Content />` outlet. ([85ff630](https://github.com/vuejs/vuepress/commit/85ff630))



<a name="1.0.0-alpha.48"></a>
# [1.0.0-alpha.48](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.47...v1.0.0-alpha.48) (2019-05-14)


### Bug Fixes

* **$core:** Failed to load theme when using `layouts/Layout.vue` as entry file (close: [#1563](https://github.com/vuejs/vuepress/issues/1563)) ([#1564](https://github.com/vuejs/vuepress/issues/1564)) ([057d8bf](https://github.com/vuejs/vuepress/commit/057d8bf))
* **$core:** Search result cannot jump to the correct hash anchor (close: [#1594](https://github.com/vuejs/vuepress/issues/1594)) ([#1599](https://github.com/vuejs/vuepress/issues/1599)) ([e6af68f](https://github.com/vuejs/vuepress/commit/e6af68f))
* **$core:** Use directory name to compute slug if filename is readme or index (close: [#1443](https://github.com/vuejs/vuepress/issues/1443)) ([#1535](https://github.com/vuejs/vuepress/issues/1535)) ([9efc678](https://github.com/vuejs/vuepress/commit/9efc678))
* **$core:** webpack externals (ref: [#451](https://github.com/vuejs/vuepress/issues/451)) ([fb324d5](https://github.com/vuejs/vuepress/commit/fb324d5))


### Features

* **$core:** Infer page's date via directory name ([#1553](https://github.com/vuejs/vuepress/issues/1553)) ([2c930c9](https://github.com/vuejs/vuepress/commit/2c930c9))
* **$core:** `info` command ([#1573](https://github.com/vuejs/vuepress/issues/1573)) ([3eeb080](https://github.com/vuejs/vuepress/commit/3eeb080))
* **$core:** Prevent duplicate route ([#1525](https://github.com/vuejs/vuepress/issues/1525)) ([441f023](https://github.com/vuejs/vuepress/commit/441f023))
* **$theme-default:** Support external links in sidebar (close: [#764](https://github.com/vuejs/vuepress/issues/764))([#1534](https://github.com/vuejs/vuepress/issues/1534)) ([141bd11](https://github.com/vuejs/vuepress/commit/141bd11))



<a name="1.0.0-alpha.47"></a>
# [1.0.0-alpha.47](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.46...v1.0.0-alpha.47) (2019-04-06)


### Bug Fixes

* **$core:** `index.styl` is not injected at the end of the style bundle (close: [#1523](https://github.com/vuejs/vuepress/issues/1523)) ([dabf506](https://github.com/vuejs/vuepress/commit/dabf506))
* **$core:** `routerBase` will always get '/' (close: [#1503](https://github.com/vuejs/vuepress/issues/1503)) ([9fba549](https://github.com/vuejs/vuepress/commit/9fba549))
* **$markdown:** Snippets should allow spaces in file path (closes [#1505](https://github.com/vuejs/vuepress/issues/1505)) ([#1517](https://github.com/vuejs/vuepress/issues/1517)) ([5c307c9](https://github.com/vuejs/vuepress/commit/5c307c9))


### Features

* **$core:** assert return type for functional plugin ([#1516](https://github.com/vuejs/vuepress/issues/1516)) ([74887c5](https://github.com/vuejs/vuepress/commit/74887c5))
* **$core:** emit warning if the source directory doesn't exist (close: [#1521](https://github.com/vuejs/vuepress/issues/1521)) ([6da9a5f](https://github.com/vuejs/vuepress/commit/6da9a5f))
* **$plugin-pwa:** allow using local workbox files (close: [#539](https://github.com/vuejs/vuepress/issues/539)) ([4640614](https://github.com/vuejs/vuepress/commit/4640614))



<a name="1.0.0-alpha.46"></a>
# [1.0.0-alpha.46](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.45...v1.0.0-alpha.46) (2019-04-01)


### Bug Fixes

* **$core:** regression of introducing dynamic `routerBase` (close: [#1498](https://github.com/vuejs/vuepress/issues/1498)) ([5e12b49](https://github.com/vuejs/vuepress/commit/5e12b49))



<a name="1.0.0-alpha.45"></a>
# [1.0.0-alpha.45](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.44...v1.0.0-alpha.45) (2019-03-31)


### Bug Fixes

* **$core:** do not register component in render function ([#1449](https://github.com/vuejs/vuepress/issues/1449)) ([ef82c47](https://github.com/vuejs/vuepress/commit/ef82c47))
* **$core:** do not use stylus in outbound link ([d34e038](https://github.com/vuejs/vuepress/commit/d34e038))
* **$core:** should default host be 0.0.0.0 ([699492a](https://github.com/vuejs/vuepress/commit/699492a))
* **$markdown:** treat styl as stylus language ([#1433](https://github.com/vuejs/vuepress/issues/1433)) ([f44e2db](https://github.com/vuejs/vuepress/commit/f44e2db))
* **$markdown-loader:** always use `/` instead of `\` in `relPath` ([#1484](https://github.com/vuejs/vuepress/issues/1484)) ([944ebe4](https://github.com/vuejs/vuepress/commit/944ebe4))
* **$plugin-active-header-links:** side navigation edge case bug ([#1477](https://github.com/vuejs/vuepress/issues/1477)) ([8a11d14](https://github.com/vuejs/vuepress/commit/8a11d14))
* **$plugin-blog:** inconsistent paths of tag and category pages with index page ([#1420](https://github.com/vuejs/vuepress/issues/1420)) ([5c0e62f](https://github.com/vuejs/vuepress/commit/5c0e62f))
* **$plugin-pwa:** fix a typo in `opacity` ([#1444](https://github.com/vuejs/vuepress/issues/1444)) ([c174f0d](https://github.com/vuejs/vuepress/commit/c174f0d))
* **$theme-default:** fix wrong editLink (close: [#1115](https://github.com/vuejs/vuepress/issues/1115), [#1125](https://github.com/vuejs/vuepress/issues/1125)) ([#1419](https://github.com/vuejs/vuepress/issues/1419)) ([3b14375](https://github.com/vuejs/vuepress/commit/3b14375))
* **$theme-default:** nav url change bug (close: [#865](https://github.com/vuejs/vuepress/issues/865)) ([#1475](https://github.com/vuejs/vuepress/issues/1475)) ([521dddd](https://github.com/vuejs/vuepress/commit/521dddd))


### Features

* **$core:** allow dynamic routeBase at runtime ([fc99d59](https://github.com/vuejs/vuepress/commit/fc99d59))
* **$core:** decode page path for better readability ([#1438](https://github.com/vuejs/vuepress/issues/1438)) ([93b2ca1](https://github.com/vuejs/vuepress/commit/93b2ca1))
* **$core:** export version ([#1486](https://github.com/vuejs/vuepress/issues/1486)) ([d7b8daf](https://github.com/vuejs/vuepress/commit/d7b8daf))
* **$core:** functional siteConfig.evergreen ([#1489](https://github.com/vuejs/vuepress/issues/1489)) ([19e0569](https://github.com/vuejs/vuepress/commit/19e0569))
* **$core:** support array as plugin options ([#1493](https://github.com/vuejs/vuepress/issues/1493)) ([9e07b1e](https://github.com/vuejs/vuepress/commit/9e07b1e))
* **$markdown:** markdown plugin (close: [#585](https://github.com/vuejs/vuepress/issues/585)) ([#1422](https://github.com/vuejs/vuepress/issues/1422)) ([9734a58](https://github.com/vuejs/vuepress/commit/9734a58))
* **$plugin-register-components:** custom name registration (close: [#656](https://github.com/vuejs/vuepress/issues/656)) ([#1418](https://github.com/vuejs/vuepress/issues/1418)) ([9c6a00b](https://github.com/vuejs/vuepress/commit/9c6a00b))


### Breaking Changes

* Deprecated [@vuepress/plugin-container](https://www.npmjs.com/package/@vuepress/plugin-container) and moved it to [vuepress-plugin-container](https://www.npmjs.com/package/vuepress-plugin-container).
* Deprecated [@vuepress/plugin-clean-urls](https://www.npmjs.com/package/@vuepress/plugin-clean-urls) and moved it to [vuepress-plugin-clean-urls](https://www.npmjs.com/package/vuepress-plugin-clean-urls).


<a name="1.0.0-alpha.44"></a>
# [1.0.0-alpha.44](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.43...v1.0.0-alpha.44) (2019-03-10)


### Features

* **$core:** optional `callback` when socket connection is ready under dev. ([547e4f9](https://github.com/vuejs/vuepress/commit/547e4f9))
* **$core:** return current app instance in node api ([1c2a6b2](https://github.com/vuejs/vuepress/commit/1c2a6b2))




<a name="1.0.0-alpha.43"></a>
# [1.0.0-alpha.43](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.42...v1.0.0-alpha.43) (2019-03-09)


### Bug Fixes

* **$core:** cannot render another page with pageKey (close: [#1173](https://github.com/vuejs/vuepress/issues/1173)) ([9d01514](https://github.com/vuejs/vuepress/commit/9d01514))
* **$core:** global components cannot be used as layouts (close: [#1321](https://github.com/vuejs/vuepress/issues/1321)) ([0306574](https://github.com/vuejs/vuepress/commit/0306574))
* **$core:** PascalCase layouts cannot be used with camelCase nor hyphen-delimited (close: [#1391](https://github.com/vuejs/vuepress/issues/1391)) ([3e91eba](https://github.com/vuejs/vuepress/commit/3e91eba))
* **$plugin-blog:** read `layoutComponents` from themeAPI ([#1396](https://github.com/vuejs/vuepress/issues/1396)) ([5bf4d24](https://github.com/vuejs/vuepress/commit/5bf4d24))


### Features

* **$core:** refine node api ([#1395](https://github.com/vuejs/vuepress/issues/1395)) ([e5d8ed4](https://github.com/vuejs/vuepress/commit/e5d8ed4))
* **$cli:** `--no-clear-screen` flag (close: [#1421](https://github.com/vuejs/vuepress/issues/1421)) ([e5f51de](https://github.com/vuejs/vuepress/commit/e5f51de))



<a name="1.0.0-alpha.42"></a>
# [1.0.0-alpha.42](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.41...v1.0.0-alpha.42) (2019-03-03)


### Bug Fixes

* **$theme-default:** support slot and v-pre container (close: [#1387](https://github.com/vuejs/vuepress/issues/1387)) ([#1389](https://github.com/vuejs/vuepress/issues/1389)) ([c85f62d](https://github.com/vuejs/vuepress/commit/c85f62d))


<a name="1.0.0-alpha.41"></a>
# [1.0.0-alpha.41](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.40...v1.0.0-alpha.41) (2019-03-02)


### Bug Fixes

* **$core:** Generated js have SyntaxError when source-map is enabled (close: [#1367](https://github.com/vuejs/vuepress/issues/1367)) ([#1378](https://github.com/vuejs/vuepress/issues/1378)) ([b53324d](https://github.com/vuejs/vuepress/commit/b53324d))
* **$core:** skip plugin on error (Related to [#1371](https://github.com/vuejs/vuepress/issues/1371)) [#1383](https://github.com/vuejs/vuepress/issues/1383) ([7d2c065](https://github.com/vuejs/vuepress/commit/7d2c065))
* **$core:** support theme index file which is not at root (close: [#1362](https://github.com/vuejs/vuepress/issues/1362)) ([#1376](https://github.com/vuejs/vuepress/issues/1376)) ([204cbe4](https://github.com/vuejs/vuepress/commit/204cbe4))
* **$markdown:** fix line highlighting (close: [#1364](https://github.com/vuejs/vuepress/issues/1364)) ([#1369](https://github.com/vuejs/vuepress/issues/1369)) ([5a111a2](https://github.com/vuejs/vuepress/commit/5a111a2))
* **$theme-default:** encodeURI for sidebar items which contain CJK characters (close: [#717](https://github.com/vuejs/vuepress/issues/717)) ([285b368](https://github.com/vuejs/vuepress/commit/285b368))


### Features

* **$plugin-container:** init ([#1381](https://github.com/vuejs/vuepress/issues/1381)) ([ad0ff72](https://github.com/vuejs/vuepress/commit/ad0ff72))
* **$markdown:** TOC component (close: [#1275](https://github.com/vuejs/vuepress/issues/1275)) ([#1375](https://github.com/vuejs/vuepress/issues/1375)) ([760f90b](https://github.com/vuejs/vuepress/commit/760f90b))
* **$plugin-nprogress:** allow nprogress use different color and add docs ([#1366](https://github.com/vuejs/vuepress/issues/1366)) ([1a928c7](https://github.com/vuejs/vuepress/commit/1a928c7))



<a name="1.0.0-alpha.40"></a>
# [1.0.0-alpha.40](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.39...v1.0.0-alpha.40) (2019-02-27)


### Bug Fixes

* **$cli:** re-support option `--open` (close: [#1320](https://github.com/vuejs/vuepress/issues/1320)) ([#1329](https://github.com/vuejs/vuepress/issues/1329)) ([b97e9ee](https://github.com/vuejs/vuepress/commit/b97e9ee))
* **$core:** handle redirect based on lower case ([#1333](https://github.com/vuejs/vuepress/issues/1333)) ([505fea6](https://github.com/vuejs/vuepress/commit/505fea6))
* **$core:** update outbound link icon alignment ([#1308](https://github.com/vuejs/vuepress/issues/1308)) ([6de1c30](https://github.com/vuejs/vuepress/commit/6de1c30))
* **$plugin-pwa:** service worker doesn't work under sub directory (close: [#1311](https://github.com/vuejs/vuepress/issues/1311)) ([0d56a99](https://github.com/vuejs/vuepress/commit/0d56a99))


### Features

* **$core:** refine theme api ([d16d3d5](https://github.com/vuejs/vuepress/commit/d16d3d5)) ([#1319](https://github.com/vuejs/vuepress/issues/1319))
  - Check out [Theme Inheritance](https://v1.vuepress.vuejs.org/theme/inheritance.html) for more details.
* **$markdown:** code snippet hmr (close [#1309](https://github.com/vuejs/vuepress/issues/1309)) ([#1358](https://github.com/vuejs/vuepress/issues/1358)) ([8f83a17](https://github.com/vuejs/vuepress/commit/8f83a17))
* **$markdown:** refine markdown api ([#1337](https://github.com/vuejs/vuepress/issues/1337)) ([b79768c](https://github.com/vuejs/vuepress/commit/b79768c))
* **$markdown:** cache parser ([#1359](https://github.com/vuejs/vuepress/issues/1359)) ([f04adbf](https://github.com/vuejs/vuepress/commit/f04adbf))
* **$theme-default:** add ruby shortcut `rb` support for syntax highlighting ([#1312](https://github.com/vuejs/vuepress/issues/1312)) ([dad2928](https://github.com/vuejs/vuepress/commit/dad2928))
* **$theme-default:** should allow for optional `h1` text at homepage ([#1326](https://github.com/vuejs/vuepress/issues/1326)) ([598799f](https://github.com/vuejs/vuepress/commit/598799f))
* **$plugin-clean-urls:** init ([#1339](https://github.com/vuejs/vuepress/issues/1339)) ([40b3da8](https://github.com/vuejs/vuepress/commit/40b3da8))



<a name="1.0.0-alpha.39"></a>
# [1.0.0-alpha.39](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.38...v1.0.0-alpha.39) (2019-02-17)


### Bug Fixes

* **$core:** cannot read property 'globalLayout' of null (close: [#1304](https://github.com/vuejs/vuepress/issues/1304)) ([94dab12](https://github.com/vuejs/vuepress/commit/94dab12))
* **$core:** cannot use relative path in a permalink page (close: [#1227](https://github.com/vuejs/vuepress/issues/1227))([#1298](https://github.com/vuejs/vuepress/issues/1298)) ([d560e22](https://github.com/vuejs/vuepress/commit/d560e22))
  - Check out the [blog post](https://vuepress-relative-paths.ulivz.com/) for more details.


<a name="1.0.0-alpha.38"></a>
# [1.0.0-alpha.38](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.37...v1.0.0-alpha.38) (2019-02-16)


### Bug Fixes

* **$plugin-pwa:** set current registration scope for service worker (close: [#1271](https://github.com/vuejs/vuepress/issues/1271)) ([#1302](https://github.com/vuejs/vuepress/issues/1302)) ([4b2b0f4](https://github.com/vuejs/vuepress/commit/4b2b0f4))
* **$theme-default:** sidebar group item cannot contain empty children (close: [#1278](https://github.com/vuejs/vuepress/issues/1278)) ([5f1eb0e](https://github.com/vuejs/vuepress/commit/5f1eb0e))


### Features

* **$core:** support global layout (close: [#1226](https://github.com/vuejs/vuepress/issues/1226)) ([c91f55a](https://github.com/vuejs/vuepress/commit/c91f55a))
* **$theme-default:** disable search box via frontmatter (close: [#1287](https://github.com/vuejs/vuepress/issues/1287)) ([#1288](https://github.com/vuejs/vuepress/issues/1288)) ([54e9eb0](https://github.com/vuejs/vuepress/commit/54e9eb0))




<a name="1.0.0-alpha.37"></a>
# [1.0.0-alpha.37](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.36...v1.0.0-alpha.37) (2019-02-08)


### Features

* **$core:** redirects for clean urls ([#1269](https://github.com/vuejs/vuepress/issues/1269)) ([213bb34](https://github.com/vuejs/vuepress/commit/213bb34))
* **$theme-default:** fallback current group node to page node if children doesn't exist ([11ce576](https://github.com/vuejs/vuepress/commit/11ce576))
* **$theme-default:** highlight sidebar link text at root level like sidebar group heading text ([05e793f](https://github.com/vuejs/vuepress/commit/05e793f))
* **$theme-default:** unify the text color of sidebar heading text and root-level sidebar link ([3e47a20](https://github.com/vuejs/vuepress/commit/3e47a20))



<a name="1.0.0-alpha.36"></a>
# [1.0.0-alpha.36](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.35...v1.0.0-alpha.36) (2019-02-03)


### Bug Fixes

* **$core:** SFC page compile error (close: [#1110](https://github.com/vuejs/vuepress/issues/1110)) ([8f5b0cd](https://github.com/vuejs/vuepress/commit/8f5b0cd))


### Features

* **$theme-default:** refine sidebar groups ([#1257](https://github.com/vuejs/vuepress/issues/1257)) ([01dd45b](https://github.com/vuejs/vuepress/commit/01dd45b)), closes [#814](https://github.com/vuejs/vuepress/issues/814) [#783](https://github.com/vuejs/vuepress/issues/783) [#287](https://github.com/vuejs/vuepress/issues/287)
  - `sidebarDepth` for a specified sidebar group.
  - Nested sidebar groups.
  - Clickable heading for sidebar groups.



<a name="1.0.0-alpha.35"></a>
# [1.0.0-alpha.35](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.34...v1.0.0-alpha.35) (2019-01-30)


### Bug Fixes

* **$core:** bust cache of extra watching files ([075f470](https://github.com/vuejs/vuepress/commit/075f470))
* **$core:** never throw error if layout component does not exist ([#1247](https://github.com/vuejs/vuepress/issues/1247)) ([49c5983](https://github.com/vuejs/vuepress/commit/49c5983))
* **$core:** style and platte path sep on windows ([#1246](https://github.com/vuejs/vuepress/issues/1246)) ([592918a](https://github.com/vuejs/vuepress/commit/592918a))
* **$theme-default:** bitbucket edit link goes to wrong link (close: [#1235](https://github.com/vuejs/vuepress/issues/1235)) ([#1248](https://github.com/vuejs/vuepress/issues/1248)) ([3c5b3a6](https://github.com/vuejs/vuepress/commit/3c5b3a6))


### Features

* **$core:** exclude temp dir from being ignored watching ([c6797dd](https://github.com/vuejs/vuepress/commit/c6797dd))



<a name="1.0.0-alpha.34"></a>
# [1.0.0-alpha.34](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.33...v1.0.0-alpha.34) (2019-01-29)


### Bug Fixes

* **$core:** Cannot load assets when `base` is not '/' (close:  [#1238](https://github.com/vuejs/vuepress/issues/1238))([#1239](https://github.com/vuejs/vuepress/issues/1239)) ([8a234bb](https://github.com/vuejs/vuepress/commit/8a234bb))
  <br>This is a regression issue of leverage webpack-dev-server at [#1195](https://github.com/vuejs/vuepress/issues/1195).

* **$markdown:** Remove colon as separator for [Import Code Snippets](https://v1.vuepress.vuejs.org/guide/markdown.html#import-code-snippets) (close: [#1151](https://github.com/vuejs/vuepress/issues/1151)) ([#1236](https://github.com/vuejs/vuepress/issues/1236)) ([099d346](https://github.com/vuejs/vuepress/commit/099d346))


### Features

* **$core:** Support extra watching files ([02cc268](https://github.com/vuejs/vuepress/commit/02cc268)),
  <br>e.g.
  ```js
  // .vuepress/config.js
  module.exports = {
    extraWatchFiles: [
      require.resolve('./sidebar.js')
      // or '.vuepress/sidebar.js'
    ]
  }
  ```



<a name="1.0.0-alpha.33"></a>
# [1.0.0-alpha.33](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.32...v1.0.0-alpha.33) (2019-01-27)


### Features

* **$core:** Leverage `webpack-dev-server` and sunset `webpack-serve` ([#1195](https://github.com/vuejs/vuepress/issues/1195)) ([81e3ef6](https://github.com/vuejs/vuepress/commit/81e3ef6))
  - Add new plugin option api [beforeDevServer](https://v1.vuepress.vuejs.org/plugin/option-api.html#beforedevserver) and [afterDevServer](https://v1.vuepress.vuejs.org/plugin/option-api.html#afterdevserver).
  - Remove `enhanceDevServer`.
  - Publish [vuepress-plugin-export](https://github.com/ulivz/vuepress-plugin-export).
* **$core:** Allow a theme package using a sub directory (close [#1204](https://github.com/vuejs/vuepress/issues/1204)) ([#1206](https://github.com/vuejs/vuepress/issues/1206)) ([febe3a7](https://github.com/vuejs/vuepress/commit/febe3a7))
* **$theme-default:** Support shortcut for `sh` and `yml`. (close: [#1221](https://github.com/vuejs/vuepress/issues/1221)) ([fc5dba8](https://github.com/vuejs/vuepress/commit/fc5dba8))

### BREAKING CHANGES

* **$core:** - Plugin option `enhanceDevServer` was removed.
  - **For 0.x users**, there is no any effect since we didn't expose API to modify it.
  - **For 1.x users whose version of VuePress is lower than 1.0.0-alpha.33**, you should use [`beforeDevServer`](https://v1.vuepress.vuejs.org/plugin/option-api.html#beforedevserver)(i.e. [before](https://webpack.js.org/configuration/dev-server/#devserver-before) in `webpack-dev-server`) to replace `enhanceDevServer`, you can also use [`afterDevServer`](https://v1.vuepress.vuejs.org/plugin/option-api.html#afterdevserver)(i.e. [after](https://webpack.js.org/configuration/dev-server/#devserver-after) in `webpack-dev-server`) to execute custom middleware after all other middleware internally within the server.

<a name="1.0.0-alpha.32"></a>
# [1.0.0-alpha.32](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.31...v1.0.0-alpha.32) (2019-01-15)


### Bug Fixes

* **$plugin-blog,$plugin-google-analytics:** Uniform plugin file name to `enhanceAppFile` ([#1194](https://github.com/vuejs/vuepress/issues/1194)) ([dce17c6](https://github.com/vuejs/vuepress/commit/dce17c6))
* **$core:** Move cac dependency to `vuepress` package (close: [#1183](https://github.com/vuejs/vuepress/issues/1183)) ([#1184](https://github.com/vuejs/vuepress/issues/1184)) ([d160e68](https://github.com/vuejs/vuepress/commit/d160e68))
* **$plugin-pagination:** Won't work when `perPagePosts` is 1 and total posts is 2 ([#1176](https://github.com/vuejs/vuepress/issues/1176)) ([8735d2c](https://github.com/vuejs/vuepress/commit/8735d2c))
* **$shared-utils:** missing `gray-matter` dependency (close: [#1190](https://github.com/vuejs/vuepress/issues/1190)) ([02bf7b9](https://github.com/vuejs/vuepress/commit/02bf7b9))
* **$theme-default:** Tag `<main>` has no matching end tag ([#1181](https://github.com/vuejs/vuepress/issues/1181)) ([c82cc10](https://github.com/vuejs/vuepress/commit/c82cc10))



<a name="1.0.0-alpha.31"></a>
# [1.0.0-alpha.31](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.30...v1.0.0-alpha.31) (2019-01-10)


### Bug Fixes

* **$core:** Check if layout exists ([#1166](https://github.com/vuejs/vuepress/issues/1166)) ([38d1dea](https://github.com/vuejs/vuepress/commit/38d1dea))
* **$core:** `NotFound` component doesn't work (close: [#1130](https://github.com/vuejs/vuepress/issues/1130)) ([b562972](https://github.com/vuejs/vuepress/commit/b562972))
* **$core:** Mormalize override stylus file path in windows ([#1164](https://github.com/vuejs/vuepress/issues/1164)) ([9665196](https://github.com/vuejs/vuepress/commit/9665196))
* **$core:** frontmatter attribute in `additionalPages` is ignored when combined with content (close: [#1157](https://github.com/vuejs/vuepress/issues/1157)) ([87894ff](https://github.com/vuejs/vuepress/commit/87894ff))
* **$plugin-back-to-top:** use `$accent-color`. (close: [#1121](https://github.com/vuejs/vuepress/issues/1121)) ([#1122](https://github.com/vuejs/vuepress/issues/1122)) ([929da11](https://github.com/vuejs/vuepress/commit/929da11))
* **$theme-default:** style is incompatible in low version iOS (<= iOS9) ([#1136](https://github.com/vuejs/vuepress/issues/1136)) ([f46de67](https://github.com/vuejs/vuepress/commit/f46de67))


### Features

* **$new-package:** standalone nprogress plugin ([25db1ba](https://github.com/vuejs/vuepress/commit/25db1ba))
* **$plugin-google-analytics:** set `anonymizeIp` to true in order to be compliant with GDPR.([#1153](https://github.com/vuejs/vuepress/issues/1153)) ([122e024](https://github.com/vuejs/vuepress/commit/122e024))
* **$theme-default:** semantic HTML (close: [#1154](https://github.com/vuejs/vuepress/issues/1154))([#1156](https://github.com/vuejs/vuepress/issues/1156)) ([ede57b0](https://github.com/vuejs/vuepress/commit/ede57b0))




<a name="1.0.0-alpha.30"></a>
# [1.0.0-alpha.30](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.29...v1.0.0-alpha.30) (2018-12-18)

### Features

* **$core:** add `--open` argument to open browser automatically (close: [#1100](https://github.com/vuejs/vuepress/issues/1100))([#1109](https://github.com/vuejs/vuepress/issues/1109)) ([550317e](https://github.com/vuejs/vuepress/commit/550317e))
* **$core:** re-enable behavior of scrolling to anchor link (close: [#1107](https://github.com/vuejs/vuepress/issues/1107))([#1108](https://github.com/vuejs/vuepress/issues/1108)) ([7ad0a42](https://github.com/vuejs/vuepress/commit/7ad0a42))

### Breaking Changes

* **$core:** remove `contentLoading` and refine scroll behavior ([#1117](https://github.com/vuejs/vuepress/issues/1117)) ([0a7d85b](https://github.com/vuejs/vuepress/commit/0a7d85b))
  - It also fixes the existing issues about anchor links. (Refs: [#1113](https://github.com/vuejs/vuepress/issues/1113), [#1016](https://github.com/vuejs/vuepress/issues/1016), [#1011](https://github.com/vuejs/vuepress/issues/1011), [#895](https://github.com/vuejs/vuepress/issues/895))

### Performance Improvements

* **$core:** improve ssr performance ([#1068](https://github.com/vuejs/vuepress/issues/1068)) ([1c2aa08](https://github.com/vuejs/vuepress/commit/1c2aa08))



<a name="1.0.0-alpha.29"></a>
# [1.0.0-alpha.29](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.28...v1.0.0-alpha.29) (2018-12-13)


### Bug Fixes

* **$plugin-blog:** fix blog layout rendering error (close: [#1073](https://github.com/vuejs/vuepress/issues/1073)) ([#1095](https://github.com/vuejs/vuepress/issues/1095)) ([f8469eb](https://github.com/vuejs/vuepress/commit/f8469eb))
* **$core:** variable `parent` is undefined in build process ([#1098](https://github.com/vuejs/vuepress/issues/1098)) ([dc7be95](https://github.com/vuejs/vuepress/commit/dc7be95))



<a name="1.0.0-alpha.28"></a>
# [1.0.0-alpha.28](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.27...v1.0.0-alpha.28) (2018-12-12)


### Bug Fixes

* **$cli:** bump CAC version ([#1062](https://github.com/vuejs/vuepress/issues/1062)) ([172afa3](https://github.com/vuejs/vuepress/commit/172afa3))
* **$core:** async function support for plugin option `additionalPages` (close: [#1077](https://github.com/vuejs/vuepress/issues/1077))([#1080](https://github.com/vuejs/vuepress/issues/1080)) ([3095106](https://github.com/vuejs/vuepress/commit/3095106))
* **$core:** `'slotKey'` must be defined as props in user's markdown's script tag (close: [#975](https://github.com/vuejs/vuepress/issues/975)) ([ece2e1e](https://github.com/vuejs/vuepress/commit/ece2e1e))
* **$core:** remove smoothing scroll (close: [#1071](https://github.com/vuejs/vuepress/issues/1071)) ([#1075](https://github.com/vuejs/vuepress/issues/1075)) ([26c0628](https://github.com/vuejs/vuepress/commit/26c0628))
* **$theme-default:** fix height of input in SearchBox for IE11 ([#1093](https://github.com/vuejs/vuepress/issues/1093)) ([04510e9](https://github.com/vuejs/vuepress/commit/04510e9))


### Features

* **$core:** pass generated page paths to `generated` hook ([#925](https://github.com/vuejs/vuepress/issues/925)) ([5ee2b2b](https://github.com/vuejs/vuepress/commit/5ee2b2b))
* **$core:** `extendCli` Plugin Option API ([#1069](https://github.com/vuejs/vuepress/issues/1069)) ([e963731](https://github.com/vuejs/vuepress/commit/e963731))
  - See [docs](https://v1.vuepress.vuejs.org/plugin/option-api.html#extendcli).
* **$plugin-search:** searchable paths with test RegExp ([#1032](https://github.com/vuejs/vuepress/issues/1032)) ([d6bddf1](https://github.com/vuejs/vuepress/commit/d6bddf1))



<a name="1.0.0-alpha.27"></a>
# [1.0.0-alpha.27](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.26...v1.0.0-alpha.27) (2018-12-03)


### Bug Fixes

* **$core:** `vuepress dev` broken on nodejs v10 and greater (close: [#1063](https://github.com/vuejs/vuepress/issues/1063)) (close: [#1064](https://github.com/vuejs/vuepress/issues/1064)) ([39e9673](https://github.com/vuejs/vuepress/commit/39e9673))

<a name="1.0.0-alpha.26"></a>
# [1.0.0-alpha.26](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.25...v1.0.0-alpha.26) (2018-12-02)


### Bug Fixes

* **$core:** changing `frontmatter` always took a long time to refresh page ([68add19](https://github.com/vuejs/vuepress/commit/68add19))
  - From now on `AppContext` has become a `singleton`.


### Features

* **$cli:** allow unknown options in dev and build command ([0ecd099](https://github.com/vuejs/vuepress/commit/0ecd099))
* **$core:** debug to see performance ([0876491](https://github.com/vuejs/vuepress/commit/0876491))
  - Using `--developer` flag to see the performance for 1st dev and build. note that `--developer` flag is a separate flag which doesn't have log level.
* **$core:** support Vue SFCs as source files ([dfb0bba](https://github.com/vuejs/vuepress/commit/dfb0bba))
  - Note that when Vue SFCs are source files, VuePress will treat them as `layout components` directly.

<a name="1.0.0-alpha.25"></a>
# [1.0.0-alpha.25](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.24...v1.0.0-alpha.25) (2018-11-29)


### Bug Fixes

* **$core:** content property of additionalPages doesn't work (close: [#1050](https://github.com/vuejs/vuepress/issues/1050)) ([4f505a8](https://github.com/vuejs/vuepress/commit/4f505a8))
* **$core:** markdown slots doesn't work (close: [#1048](https://github.com/vuejs/vuepress/issues/1048))([#1054](https://github.com/vuejs/vuepress/issues/1054)) ([c07949d](https://github.com/vuejs/vuepress/commit/c07949d))
* **$theme-default:** Extending `Layout.vue` causes the Sidebar to disappear (close: [#1045](https://github.com/vuejs/vuepress/issues/1045)) ([8dd418e](https://github.com/vuejs/vuepress/commit/8dd418e))


### Features

* **$cli:** migrate to CAC ([#1049](https://github.com/vuejs/vuepress/issues/1049)) ([1a897cb](https://github.com/vuejs/vuepress/commit/1a897cb))
* **$core:** support debug in dev process ([#1051](https://github.com/vuejs/vuepress/issues/1051)) ([e570252](https://github.com/vuejs/vuepress/commit/e570252))
* **$core:** AppContext was still expecting --outDir instead of --dest ([#1041](https://github.com/vuejs/vuepress/issues/1041)) ([5d9f87b](https://github.com/vuejs/vuepress/commit/5d9f87b))
* **$markdown:** pass rest options to instantiate markdown-it ([d8db81c](https://github.com/vuejs/vuepress/commit/d8db81c)), closes [#1040](https://github.com/vuejs/vuepress/issues/1040)



<a name="1.0.0-alpha.24"></a>
# [1.0.0-alpha.24](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2018-11-25)


### Bug Fixes

* **$core:** distracting and time wasting after importing smoothing scroll ([58981fb](https://github.com/vuejs/vuepress/commit/58981fb))
* **$cli:** 'vuepress eject' doesn't copy files (close: [#1028](https://github.com/vuejs/vuepress/issues/1028)) ([aad86b9](https://github.com/vuejs/vuepress/commit/aad86b9))
* **$markdown:** "index" is dropped in a link with "*index" pattern ([e8b78c4](https://github.com/vuejs/vuepress/commit/e8b78c4)), closes [#996](https://github.com/vuejs/vuepress/issues/996)
* **$plugin-blog:** blocking front matter custom layout config (close:  [#906](https://github.com/vuejs/vuepress/issues/906)) ([#1027](https://github.com/vuejs/vuepress/issues/1027)) ([ab0e002](https://github.com/vuejs/vuepress/commit/ab0e002))
* **$test-utils:** test failed due to wrong babel version ([8611c1c](https://github.com/vuejs/vuepress/commit/8611c1c))
* **$theme-default:** hard to read in a dark-themed browser (close: [#1025](https://github.com/vuejs/vuepress/issues/1025)) ([d338468](https://github.com/vuejs/vuepress/commit/d338468))
* **$theme-default:** shouldn't transform date string at client side (close: [#1035](https://github.com/vuejs/vuepress/issues/1035)) ([c059faa](https://github.com/vuejs/vuepress/commit/c059faa))


### Features

* **$cli:** '--silent' option ([df99cb6](https://github.com/vuejs/vuepress/commit/df99cb6))
* **$core:** disable smoothing scroll by default ([de72c91](https://github.com/vuejs/vuepress/commit/de72c91))
* **$core:** more concise logger ([9c61390](https://github.com/vuejs/vuepress/commit/9c61390))



<a name="1.0.0-alpha.23"></a>
# [1.0.0-alpha.23](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2018-11-18)


### Bug Fixes

* **$core:** anchor links not updating current URL (closes [#1011](https://github.com/vuejs/vuepress/issues/1011)) ([#1014](https://github.com/vuejs/vuepress/issues/1014)) ([1a87017](https://github.com/vuejs/vuepress/commit/1a87017))
* **$core:** siteConfig.chainWebpack was executed twice. ([0d45cf4](https://github.com/vuejs/vuepress/commit/0d45cf4))
* **$core:** NodeList.prototype.forEach doesn't exist in IE11 ([a3938b2](https://github.com/vuejs/vuepress/commit/a3938b2))
* **$plugin-search:** collapsed in IE11 ([8e555f6](https://github.com/vuejs/vuepress/commit/8e555f6))
* **$theme-default:** fit image for hero image ([#980](https://github.com/vuejs/vuepress/issues/980)) ([efece12](https://github.com/vuejs/vuepress/commit/efece12))
* **$theme-default:** IE11 doesn't support shortcut of flex ([6734a60](https://github.com/vuejs/vuepress/commit/6734a60))
* **$theme-default:** prev/next links disappears when url contains space. (close: [#1010](https://github.com/vuejs/vuepress/issues/1010)) ([e8d728f](https://github.com/vuejs/vuepress/commit/e8d728f))


### Features

* **$plugin-active-header-links:** add option for specifying the top offset ([#1005](https://github.com/vuejs/vuepress/issues/1005)) ([100bbf2](https://github.com/vuejs/vuepress/commit/100bbf2))
* **$plugin-active-header-links:** simplify implementation ([6b9b38b](https://github.com/vuejs/vuepress/commit/6b9b38b))
* **$core:** using 'smooth-scroll' ([5b0cdcf](https://github.com/vuejs/vuepress/commit/5b0cdcf))



<a name="1.0.0-alpha.22"></a>
# [1.0.0-alpha.22](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2018-11-13)

### Bug Fixes

* **$core:** `.vuepress/style.styl` does not take effect in the production environment. ([#977](https://github.com/vuejs/vuepress/issues/977)) ([2dafd88](https://github.com/vuejs/vuepress/commit/2dafd88))


<a name="1.0.0-alpha.21"></a>
# [1.0.0-alpha.21](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2018-11-13)


### Bug Fixes

* **$plugin-medium-zoom:** not updating on component update ([#994](https://github.com/vuejs/vuepress/issues/994)) ([6aa4d91](https://github.com/vuejs/vuepress/commit/6aa4d91))


### Features

* **$core:** cache option (boolean | absolute path | relative path) ([3871f4a](https://github.com/vuejs/vuepress/commit/3871f4a)), closes [#993](https://github.com/vuejs/vuepress/issues/993)
* **$markdown:** ability to disable built-in markdown extensions ([15af271](https://github.com/vuejs/vuepress/commit/15af271))
* **$plugin-blog:** add postsDir option ([#998](https://github.com/vuejs/vuepress/issues/998)) ([ecb1920](https://github.com/vuejs/vuepress/commit/ecb1920))
* **$plugin-blog:** Allow the permalink for blog posts to be configured. ([#997](https://github.com/vuejs/vuepress/issues/997)) ([615006d](https://github.com/vuejs/vuepress/commit/615006d))



<a name="1.0.0-alpha.20"></a>
# [1.0.0-alpha.20](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2018-11-09)


### Bug Fixes

* **$theme-default:** missing edit links under non-contentLoading situations ([47e9654](https://github.com/vuejs/vuepress/commit/47e9654))
* **$core:** globally installed vuepress cannot resolve '[@vuepress](https://github.com/vuepress)/default' ([256b7c4](https://github.com/vuejs/vuepress/commit/256b7c4)), closes [#985](https://github.com/vuejs/vuepress/issues/985)


### Features

* **$core:** global computed '$frontmatter' ([3a42c24](https://github.com/vuejs/vuepress/commit/3a42c24))
* **$core:** better hash locate behavior ([5918ca9](https://github.com/vuejs/vuepress/commit/5918ca9))
* **$plugin-pwa:** alias '[@sw-event](https://github.com/sw-event)' ([628c330](https://github.com/vuejs/vuepress/commit/628c330))



<a name="1.0.0-alpha.19"></a>
# [1.0.0-alpha.19](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2018-11-06)


### Bug Fixes

* **$plugin-active-header-links:** unexpected error when anchors were empty ([d658169](https://github.com/vuejs/vuepress/commit/d658169))


### Features

* **$markdown-loader:** AsyncMarkdownContentLoaded event ([6f52012](https://github.com/vuejs/vuepress/commit/6f52012))
* **$plugin-active-header-links:** sidebarLinkSelector & headerAnchorSelector option ([3a79635](https://github.com/vuejs/vuepress/commit/3a79635))
* **$core:** built-in content loading ([216d04a](https://github.com/vuejs/vuepress/commit/216d04a))
* **$core:** Client VuePress Plugin ([9c947b2](https://github.com/vuejs/vuepress/commit/9c947b2))
* **$core:** 'contentLoading' site config option ([f8e42bc](https://github.com/vuejs/vuepress/commit/f8e42bc))
* **$plugin-medium-zoom:** support selector option. ([ce7da09](https://github.com/vuejs/vuepress/commit/ce7da09))
* **$theme-default:** display els of page bottom after content mounted ([d9a8ced](https://github.com/vuejs/vuepress/commit/d9a8ced))



<a name="1.0.0-alpha.18"></a>
# [1.0.0-alpha.18](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2018-10-29)


### Bug Fixes

* **$core:** themePath/templates/ssr.html doesn't work ([497ce80](https://github.com/vuejs/vuepress/commit/497ce80))
* **$plugin-pagination:** pages number in the pagination plugin ([#963](https://github.com/vuejs/vuepress/issues/963)) ([8bdeb09](https://github.com/vuejs/vuepress/commit/8bdeb09))
* **$theme-vue:** RangeError: Maximum call stack size exceeded (build) ([b3d4269](https://github.com/vuejs/vuepress/commit/b3d4269))


### Features

* **$new-package:** [@vuepress/theme-vue](https://github.com/vuepress) ([cb87532](https://github.com/vuejs/vuepress/commit/cb87532))
* **$core:** `extend` option API for a theme ([84fd0ff](https://github.com/vuejs/vuepress/commit/84fd0ff))
  - From now on, you can use the `extend` option to inherit an existing theme, and VuePres will automatically help you to resolve Layout components, palettes, styles, etc.


<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2018-10-27)


### Bug Fixes

* **$core:** globally installed vuepress doesn't work (close: [#908](https://github.com/vuejs/vuepress/issues/908), [#949](https://github.com/vuejs/vuepress/issues/949)) ([af80c4b](https://github.com/vuejs/vuepress/commit/af80c4b))
* **$webpack:** version of cache-loader ([636bd81](https://github.com/vuejs/vuepress/commit/636bd81))


### Features

* **$core:** frontmatter.seoTitle ([c9b0700](https://github.com/vuejs/vuepress/commit/c9b0700))



<a name="1.0.0-alpha.16"></a>
# [1.0.0-alpha.16](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2018-10-23)


### Bug Fixes

* **$plugin-last-updated:** unexpected warning of last-updated plugin. ([daa4d09](https://github.com/vuejs/vuepress/commit/daa4d09))



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2018-10-23)


### Bug Fixes

* **$core:** cannot resolve local functional plugin name ([e8a35be](https://github.com/vuejs/vuepress/commit/e8a35be))



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2018-10-23)


### Bug Fixes

* **$core:** content slots doesn't work ([704031f](https://github.com/vuejs/vuepress/commit/704031f))


### Features

* **$markdown:** markdown slot shortcut ([bde4ac4](https://github.com/vuejs/vuepress/commit/bde4ac4))
* **$new-package:** init blog & blog theme ([7276664](https://github.com/vuejs/vuepress/commit/7276664))



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2018-10-17)


### Bug Fixes

* **$markdown-loader:** unexpected reload at dev when md contains frontmatter ([54efcb8](https://github.com/vuejs/vuepress/commit/54efcb8))
* **$theme-default:** remove custom layout legacy. (close: [#935](https://github.com/vuejs/vuepress/issues/935)) ([1f345d1](https://github.com/vuejs/vuepress/commit/1f345d1))



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2018-10-17)


### Bug Fixes

* **$theme-default**: algolia resolution error in theme-default ([#940](https://github.com/vuejs/vuepress/issues/940)) ([b084114](https://github.com/vuejs/vuepress/commit/b084114))
* **$core**: wrong import path (close: [#937](https://github.com/vuejs/vuepress/issues/937)) ([1dd1b55](https://github.com/vuejs/vuepress/commit/1dd1b55))
* **$plugin-blog:** category field in frontmatter doesn't work (close: [#941](https://github.com/vuejs/vuepress/issues/941)) ([00f5d3b](https://github.com/vuejs/vuepress/commit/00f5d3b))



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2018-10-15)


### Bug Fixes

* **$plugin-last-updated:** doesn't work due to internal api change ([b8ce22c](https://github.com/vuejs/vuepress/commit/b8ce22c))



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2018-10-14)


### Bug Fixes

* **$core:** correct swapped ssr.html and dev.html ([#924](https://github.com/vuejs/vuepress/issues/924)) ([3019339](https://github.com/vuejs/vuepress/commit/3019339))
* **$core:** fix extra anonymous plugin message ([#926](https://github.com/vuejs/vuepress/issues/926)) ([c95c09f](https://github.com/vuejs/vuepress/commit/c95c09f))



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2018-10-10)


### Features

* **$core:** register 'themePath/global-components' dir as global components ([04588cc](https://github.com/vuejs/vuepress/commit/04588cc)), closes [#916](https://github.com/vuejs/vuepress/issues/916)



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-10-07)


### Bug Fixes

* **$core:** theme/styles/index.styl doesn't work ([1995273](https://github.com/vuejs/vuepress/commit/1995273))



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-10-07)


### Bug Fixes

* **$core:** theme/styles/palette.styl doesn't work ([0a7e38a](https://github.com/vuejs/vuepress/commit/0a7e38a))



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2018-10-07)


### Bug Fixes

* **$core:** fix windows output path issue ([d89f766](https://github.com/vuejs/vuepress/commit/d89f766))



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2018-10-07)


### Bug Fixes

* **$plugin-pagination:** patch for  posts count ([#904](https://github.com/vuejs/vuepress/issues/904)) ([4a08d2d](https://github.com/vuejs/vuepress/commit/4a08d2d))
* **$core:** try to fix windows output path issue ([f62cd73](https://github.com/vuejs/vuepress/commit/f62cd73))


### Features

* **$new-package:** plugin-notification ([79632c0](https://github.com/vuejs/vuepress/commit/79632c0))



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2018-10-05)


### Bug Fixes

* **$core:** unexpected warning ([3fd51d5](https://github.com/vuejs/vuepress/commit/3fd51d5))
* **$core:** Check path in lowercase (close[#897](https://github.com/vuejs/vuepress/issues/897)) ([#898](https://github.com/vuejs/vuepress/issues/898)) ([94658ae](https://github.com/vuejs/vuepress/commit/94658ae))
* **plugin-google-analytics:** Google Analytics Plugin build error ([#893](https://github.com/vuejs/vuepress/issues/893)) ([d7647bc](https://github.com/vuejs/vuepress/commit/d7647bc))
* **$theme-default:** header should be fixed ([d03b10d](https://github.com/vuejs/vuepress/commit/d03b10d))


### Features

* **$core:** 'plugins' in plugin. ([7345515](https://github.com/vuejs/vuepress/commit/7345515))
* **$core:** theme entry file as plugin. ([3fbef0d](https://github.com/vuejs/vuepress/commit/3fbef0d))
* **$theme-default:** add PHP language text tag to code block. ([#892](https://github.com/vuejs/vuepress/issues/892)) ([cc056ba](https://github.com/vuejs/vuepress/commit/cc056ba))
* **$theme-default:** vue-styled deleted & inserted code ([d987ea5](https://github.com/vuejs/vuepress/commit/d987ea5))



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2018-10-03)


### Bug Fixes

* **$plugin-pwa:** z-index issue ([4cc317f](https://github.com/vuejs/vuepress/commit/4cc317f))


### Features

* **$core:** change style convention ([86736e8](https://github.com/vuejs/vuepress/commit/86736e8))
* **$core:** custom data block ([f6bb414](https://github.com/vuejs/vuepress/commit/f6bb414))
* **$markdown:** support 'vue' container ([3c430f8](https://github.com/vuejs/vuepress/commit/3c430f8))
* **$markdown:** support pass in block data at compile time ([903138e](https://github.com/vuejs/vuepress/commit/903138e))



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/vuejs/vuepress/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2018-09-28)


### Bug Fixes

* **$core:** cannot fallback to default NotFound layout correctly ([0b89d9c](https://github.com/vuejs/vuepress/commit/0b89d9c))
* **$cli:** eject failed because `config.styl` not exist ([#874](https://github.com/vuejs/vuepress/issues/874)) ([6222170](https://github.com/vuejs/vuepress/commit/6222170))


### Features

* **$core:** do not register global components at themePath/components (close: [#877](https://github.com/vuejs/vuepress/issues/877)) ([4e8da95](https://github.com/vuejs/vuepress/commit/4e8da95))
* **$core:** make palette globally enabled and improve doc ([2b2e308](https://github.com/vuejs/vuepress/commit/2b2e308))
* **$core:** multiple layout directories ([20e520d](https://github.com/vuejs/vuepress/commit/20e520d))
* **$core:** support themeIndexFile.devTemplate/ssrTemplate (close: [#882](https://github.com/vuejs/vuepress/issues/882)) ([6c6225d](https://github.com/vuejs/vuepress/commit/6c6225d))



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/vuejs/vuepress/compare/v0.14.4...v1.0.0-alpha.1) (2018-09-27)

### Features

- **Plugin API**
  - [Documentation](https://v1.vuepress.vuejs.org/plugin/)
  - Multiple official plugins
    - [@vuepress/plugin-active-header-links](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-active-header-links)
    - [@vuepress/plugin-back-to-top](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-back-to-top) (Thanks to @ycmjason )
    - [@vuepress/plugin-blog](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-blog) (For blog theme developers.)
    - [@vuepress/plugin-pagination](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pagination) (For blog theme developers.)
    - [@vuepress/plugin-google-analytics](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-google-analytics)
    - [@vuepress/plugin-last-updated](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-last-updated)
    - [@vuepress/plugin-i18n-ui](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-i18n-ui)
    - [@vuepress/plugin-medium-zoom](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-medium-zoom)
    - [@vuepress/plugin-pwa](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa)
    - [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-register-components)

- **Refined Theme API**
  - From now on, the theme will no longer use Layout.vue as the entry point, but you can have your own configuration. For example, a theme can have some built-in plugins.
  - [Documentation](https://v1.vuepress.vuejs.org/theme/)

- **Permalinks**
  - From now on, VuePress supports custom routing in addition to the default file-level-based routing.
  - [Documentation](https://v1.vuepress.vuejs.org/guide/permalinks.html)

- **Markdown slots**
  - [Documentation](https://v1.vuepress.vuejs.org/guide/markdown-slot.html)

- **Free to add new pages**
  - You can add new pages with content (i.e. pointing to markdown files) or no content (i.e. common routes).
  - [Documentation](https://v1.vuepress.vuejs.org/plugin/option-api.html#additionalpages)

- **Custom temp path**
  - The running of VuePress actually depends on some temporary files generated during the build time. Before that, its default location is in `node_modules`, but now you can start configuring it, but don't forget to add it to gitignore.
    ```bash
    vuepress dev docs --temp .temp # .temp is relative to process.cwd().
    ```

- **Custom temp path**
  - In the past, custom layouts were actually implemented by `default theme`, for now it's moved to `core`.

- **Configurable dev and ssr template**

### Internal Changes

* Leverage monorepo;
* Decouple [@vuepress/core](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core) and [@vuepress/theme-default](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/theme-default)
* Rewrite `Prepare` with `Plugin API`


<a name="0.14.5"></a>
## [0.14.5](https://github.com/vuejs/vuepress/compare/v0.14.4...v0.14.5) (2018-11-13)


### Bug Fixes

* **$core:** css cannot be extracted together (close: [#977](https://github.com/vuejs/vuepress/issues/977)) ([600ca3e](https://github.com/vuejs/vuepress/commit/600ca3e))
* **$build:** Prevent files at node_modules from being watched (close: [#855](https://github.com/vuejs/vuepress/issues/855)) ([#856](https://github.com/vuejs/vuepress/issues/856)) ([2348e75](https://github.com/vuejs/vuepress/commit/2348e75))



<a name="0.14.4"></a>
## [0.14.4](https://github.com/vuejs/vuepress/compare/v0.14.3...v0.14.4) (2018-09-15)


### Bug Fixes

* missing config.base in google analytics page view URL (close: [#818](https://github.com/vuejs/vuepress/issues/818)) ([#834](https://github.com/vuejs/vuepress/issues/834)) ([559888b](https://github.com/vuejs/vuepress/commit/559888b))
* **$markdown:** sidebar headers not being detected (close: [#841](https://github.com/vuejs/vuepress/issues/841)) ([181c1e5](https://github.com/vuejs/vuepress/commit/181c1e5))



<a name="0.14.3"></a>
## [0.14.3](https://github.com/vuejs/vuepress/compare/v0.14.2...v0.14.3) (2018-09-13)


### Bug Fixes

* **$build:** do not pick "babel.config.js" at user-land (close: [#797](https://github.com/vuejs/vuepress/issues/797)) ([48be61b](https://github.com/vuejs/vuepress/commit/48be61b))



<a name="0.14.2"></a>
## [0.14.2](https://github.com/vuejs/vuepress/compare/v0.14.1...v0.14.2) (2018-08-14)


### Bug Fixes

* SW-update popup only shows up on first page reload (close: [#677](https://github.com/vuejs/vuepress/issues/677)) ([6d8f813](https://github.com/vuejs/vuepress/commit/6d8f813))


<a name="0.14.1"></a>
## [0.14.1](https://github.com/vuejs/vuepress/compare/v0.14.0...v0.14.1) (2018-08-09)


### Bug Fixes

* **$default-theme:** default search box line wrap ([03c812b](https://github.com/vuejs/vuepress/commit/03c812b))
* **$default-theme:** navbar's regression - siteName null check ([02a4713](https://github.com/vuejs/vuepress/commit/02a4713))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/vuejs/vuepress/compare/v0.13.1...v0.14.0) (2018-08-08)


### Bug Fixes

* **$default-theme:** algolia search doesn't work well at i18n mode ([e8a6ab1](https://github.com/vuejs/vuepress/commit/e8a6ab1))
* **$default-theme:** navbar's messy layout at narrow screen ([#714](https://github.com/vuejs/vuepress/issues/714)) ([3e1da57](https://github.com/vuejs/vuepress/commit/3e1da57))
* **$default-theme:** set alias "collapsible" to "collapsable" (close: [#705](https://github.com/vuejs/vuepress/issues/705)) ([#706](https://github.com/vuejs/vuepress/issues/706)) ([ad66fa8](https://github.com/vuejs/vuepress/commit/ad66fa8))
* **$build:** skip format data.head if not exist while loading toml config ([#707](https://github.com/vuejs/vuepress/issues/707)) ([bb48a77](https://github.com/vuejs/vuepress/commit/bb48a77))


### Features

* **core:** support writing HTML(Vue) anywhere in the header. ([#711](https://github.com/vuejs/vuepress/issues/711)) ([885496e](https://github.com/vuejs/vuepress/commit/885496e))
* **$webpack:** display host url at dev HMR log ([2e8d69c](https://github.com/vuejs/vuepress/commit/2e8d69c))



<a name="0.13.1"></a>
## [0.13.1](https://github.com/vuejs/vuepress/compare/v0.13.0...v0.13.1) (2018-08-01)


### Bug Fixes

* **core:** normalize override file path in windows ([#692](https://github.com/vuejs/vuepress/issues/692)) (close: [#642](https://github.com/vuejs/vuepress/issues/642)) ([9537c2c](https://github.com/vuejs/vuepress/commit/9537c2c))
* **$default-theme:** `py` lang label doesn't display in code block ([#690](https://github.com/vuejs/vuepress/issues/690)) ([88b65cc](https://github.com/vuejs/vuepress/commit/88b65cc))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/vuejs/vuepress/compare/v0.12.0...v0.13.0) (2018-07-28)


### Bug Fixes

* **$seo:** Avoid duplicate `description meta` at runtime. (close: [#665](https://github.com/vuejs/vuepress/issues/665)) ([b207a5f](https://github.com/vuejs/vuepress/commit/b207a5f))
* **$default-theme:** Scoped styles of `Badge` component (close: [#653](https://github.com/vuejs/vuepress/issues/653)) ([#657](https://github.com/vuejs/vuepress/issues/657)) ([9b602f2](https://github.com/vuejs/vuepress/commit/9b602f2))
* **$build:** set `babelrc: false` in babel-loader options ([#644](https://github.com/vuejs/vuepress/issues/644)) ([c500201](https://github.com/vuejs/vuepress/commit/c500201)) ([@posva](https://github.com/posva))
* **$build:** exclude dest folder from pageFiles (close: [#654](https://github.com/vuejs/vuepress/issues/654)) ([#655](https://github.com/vuejs/vuepress/issues/655)) ([c1fe692](https://github.com/vuejs/vuepress/commit/c1fe692))
* **$build:** markdown config should be included in `cache-loader` identifier ([0ad1a45](https://github.com/vuejs/vuepress/commit/0ad1a45))
* **$markdown:** cannot highlight external python file (`.py`) correctly (close: [#660](https://github.com/vuejs/vuepress/issues/660)) ([2a33075](https://github.com/vuejs/vuepress/commit/2a33075))
* **$markdown:** missing space between `italics` and `bold` (close: [#661](https://github.com/vuejs/vuepress/issues/661)) ([7730ee1](https://github.com/vuejs/vuepress/commit/7730ee1))
   1. `markdown-it` compiler will intendedly reserve this space between some inline elements, but `preserveWhitespace: false` will remove them. (Ref: [vue-template-compiler#options](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options))
   2. **Performance Impact**: Size of whole assets of vuepress documentation:
      - Before (1952 kb)
      - After (1960 kb)

### Features

* **$cli:** debug flag at dev mode ([231da6a](https://github.com/vuejs/vuepress/commit/231da6a))
* **$default-theme:** transform `Badge` into async component ([de9a51b](https://github.com/vuejs/vuepress/commit/de9a51b))
* **$default-theme**(**$pwa**): `themeConfig.serviceWorker.updatePopup` option (close: [#453](https://github.com/vuejs/vuepress/issues/453)) ([#533](https://github.com/vuejs/vuepress/issues/533)) ([14dbd1e](https://github.com/vuejs/vuepress/commit/14dbd1e)) ([@mysticatea](https://github.com/mysticatea))
   ``` js
   module.exports = {
     themeConfig: {
       serviceWorker: {
         updatePopup: true
       }
     }
   }
   ```



<a name="0.12.0"></a>
# [0.12.0](https://github.com/vuejs/vuepress/compare/v0.11.0...v0.12.0) (2018-07-12)


### Bug Fixes

* **$build** npm audit vulnerability (close: [#493](https://github.com/vuejs/vuepress/issues/493))([#641](https://github.com/vuejs/vuepress/issues/641)) ([8dde5d8](https://github.com/vuejs/vuepress/commit/8dde5d8))
* **$markdown**: wrong sidebar slugs and anchor link at content (close: [#645](https://github.com/vuejs/vuepress/issues/645)) ([c2eaff3](https://github.com/vuejs/vuepress/commit/c2eaff3))


### Features

* **$core:**: version data layer ([0c5b752](https://github.com/vuejs/vuepress/commit/0c5b752))
* **$default-theme:** new file-level API: `style.styl`. ([2f53f2f](https://github.com/vuejs/vuepress/commit/2f53f2f))
  1. Fixed overriding css variable doesn't work at `0.11.0` (close: [#639](https://github.com/vuejs/vuepress/issues/639))
  2. Split `override.styl` into two APIs: `override.styl` and `style.styl`, the former will focus on ONLY the stylus constants override, while the latter will focus on styles override or custom styles. See also: https://v1.vuepress.vuejs.org/default-theme-config/#simple-css-override.


<a name="0.11.0"></a>
# [0.11.0](https://github.com/vuejs/vuepress/compare/v0.10.2...v0.11.0) (2018-07-08)


### Bug Fixes

* **$default-theme:** indent-styled code is invisible (close: [#609](https://github.com/vuejs/vuepress/issues/609)) ([fd46a26](https://github.com/vuejs/vuepress/commit/fd46a26))
* **$default-theme:** cannot get sidebar when sidebar config contains non-ASCII chars. (close: [#628](https://github.com/vuejs/vuepress/issues/628)) ([8837e7a](https://github.com/vuejs/vuepress/commit/8837e7a))
* **$core:** override style issues (close: [#637](https://github.com/vuejs/vuepress/issues/637)) ([#638](https://github.com/vuejs/vuepress/issues/638)) ([f998802](https://github.com/vuejs/vuepress/commit/f998802))
  1. Duplicated generated `override style`.
  2. Unexpected style order, `override style` should be at the end of the extracted style bundle. (ref: [mini-css-extract-plugin#130](https://github.com/webpack-contrib/mini-css-extract-plugin#130))

### Features

* **$default-theme:** page top slot ([f4c1059](https://github.com/vuejs/vuepress/commit/f4c1059))
* **$build:** set exitCode to non-zero when catching error (close: [#598](https://github.com/vuejs/vuepress/issues/598) & [#570](https://github.com/vuejs/vuepress/issues/570)) ([#615](https://github.com/vuejs/vuepress/issues/615)) ([0907c7e](https://github.com/vuejs/vuepress/commit/0907c7e))
* **$default-theme:** support display header links of all pages (close [#534](https://github.com/vuejs/vuepress/issues/534)) ([#595](https://github.com/vuejs/vuepress/issues/595)) ([36bb6a4](https://github.com/vuejs/vuepress/commit/36bb6a4))



<a name="0.10.2"></a>
## [0.10.2](https://github.com/vuejs/vuepress/compare/v0.10.1...v0.10.2) (2018-06-20)


### Bug Fixes

* build cannot exit (close: [#580](https://github.com/vuejs/vuepress/issues/580)) ([fa473a7](https://github.com/vuejs/vuepress/commit/fa473a7))
* duplicate description meta (close: [#565](https://github.com/vuejs/vuepress/issues/565)) ([de35315](https://github.com/vuejs/vuepress/commit/de35315))
* edit page from Bitbucket ([#569](https://github.com/vuejs/vuepress/issues/569)) ([5479d6e](https://github.com/vuejs/vuepress/commit/5479d6e))
* multiple markdown tokens in header text ([#564](https://github.com/vuejs/vuepress/issues/564)) ([ec330f0](https://github.com/vuejs/vuepress/commit/ec330f0))
* setting HMR port (close: [#582](https://github.com/vuejs/vuepress/issues/582)) ([#586](https://github.com/vuejs/vuepress/issues/586)) ([64bb80d](https://github.com/vuejs/vuepress/commit/64bb80d))


### Features

* refine Badge's API ([d68199d](https://github.com/vuejs/vuepress/commit/d68199d))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/vuejs/vuepress/compare/v0.10.0...v0.10.1) (2018-06-08)


### Bug Fixes

* active side arrow not middle align ([#508](https://github.com/vuejs/vuepress/issues/508)). ([5fcac1b](https://github.com/vuejs/vuepress/commit/5fcac1b))
* **$default-theme:** code renders language css as c (close: [#527](https://github.com/vuejs/vuepress/issues/527)) ([777c4f1](https://github.com/vuejs/vuepress/commit/777c4f1))
* **$default-theme:** table tag cannot scroll horizontally (close: [#518](https://github.com/vuejs/vuepress/issues/518)) ([#519](https://github.com/vuejs/vuepress/issues/519)) ([e9cdee7](https://github.com/vuejs/vuepress/commit/e9cdee7))
* **$dev:** using config.yml/toml doesn't reload changes (close: [#520](https://github.com/vuejs/vuepress/issues/520)) ([6048eb9](https://github.com/vuejs/vuepress/commit/6048eb9))
* compilation error when chainWebpack's code contains ! (close: [#532](https://github.com/vuejs/vuepress/issues/532)) ([3b5991f](https://github.com/vuejs/vuepress/commit/3b5991f))
* reserve '*' and '_' when detecting escape char '\' (close: [#544](https://github.com/vuejs/vuepress/issues/544)). ([4503cfc](https://github.com/vuejs/vuepress/commit/4503cfc))
* search box throw a error with no suggestions ([#510](https://github.com/vuejs/vuepress/issues/510)) ([1186d6a](https://github.com/vuejs/vuepress/commit/1186d6a))


### Features

* **$seo:** show page title in front of site title ([#522](https://github.com/vuejs/vuepress/issues/522)) ([ffe12b9](https://github.com/vuejs/vuepress/commit/ffe12b9))
* add support to import files as code fence ([#538](https://github.com/vuejs/vuepress/issues/538)) ([26ecff7](https://github.com/vuejs/vuepress/commit/26ecff7))
* better log ([#506](https://github.com/vuejs/vuepress/issues/506)) ([d53807e](https://github.com/vuejs/vuepress/commit/d53807e))
* enable header request Content-Range ([#555](https://github.com/vuejs/vuepress/issues/555)) ([825877c](https://github.com/vuejs/vuepress/commit/825877c))
* headers badge ([#540](https://github.com/vuejs/vuepress/issues/540)) ([c3696d2](https://github.com/vuejs/vuepress/commit/c3696d2))
* shouldPrefetch option for bundleRenderer (close: [#463](https://github.com/vuejs/vuepress/issues/463)) ([#514](https://github.com/vuejs/vuepress/issues/514)) ([9cb174d](https://github.com/vuejs/vuepress/commit/9cb174d))
* support "themeConfig.sidebar: 'auto'" (close: [#552](https://github.com/vuejs/vuepress/issues/552)) ([56cbb5f](https://github.com/vuejs/vuepress/commit/56cbb5f))
* support generic markdown file path reference ([#509](https://github.com/vuejs/vuepress/issues/509)) ([292e4bc](https://github.com/vuejs/vuepress/commit/292e4bc))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/vuejs/vuepress/compare/v0.9.1...v0.10.0) (2018-05-25)


### Features

* upgrade to babel 7 + use [@vue](https://github.com/vue)/babel-preset-app ([c43c73d](https://github.com/vuejs/vuepress/commit/c43c73d))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/vuejs/vuepress/compare/v0.9.0...v0.9.1) (2018-05-25)


### Bug Fixes

* avoid cache error (close [#492](https://github.com/vuejs/vuepress/issues/492)) ([75cdc74](https://github.com/vuejs/vuepress/commit/75cdc74))
* fix config reload cache busting ([90f9689](https://github.com/vuejs/vuepress/commit/90f9689))
* lastUpdated looks bad when editLinks is false. ([11b1830](https://github.com/vuejs/vuepress/commit/11b1830))
* wrong OutboundLink insertion position (close: [#496](https://github.com/vuejs/vuepress/issues/496)) ([af96f28](https://github.com/vuejs/vuepress/commit/af96f28))


### Features

* allow for disabling of active hash on scroll ([#489](https://github.com/vuejs/vuepress/issues/489)) ([4c09627](https://github.com/vuejs/vuepress/commit/4c09627))
* support filename that contains non-ASCII and unicode chars ([#473](https://github.com/vuejs/vuepress/issues/473)) ([566e681](https://github.com/vuejs/vuepress/commit/566e681))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/vuejs/vuepress/compare/v0.8.4...v0.9.0) (2018-05-22)


### Bug Fixes

* $page is missing at 404 page ([#388](https://github.com/vuejs/vuepress/issues/388)) ([cefc8c3](https://github.com/vuejs/vuepress/commit/cefc8c3))
* avoid the searchbox exceeded out of screen in narrow screen ([#254](https://github.com/vuejs/vuepress/issues/254)) ([8f04081](https://github.com/vuejs/vuepress/commit/8f04081))
* code looks not good at small screen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([6514c8f](https://github.com/vuejs/vuepress/commit/6514c8f))
* code looks not good at small screen (close: [#350](https://github.com/vuejs/vuepress/issues/350)) ([d0ef06f](https://github.com/vuejs/vuepress/commit/d0ef06f))
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


### Features

* bump up webpack to 4.8.1 (close: [#309](https://github.com/vuejs/vuepress/issues/309)) ([9e3f005](https://github.com/vuejs/vuepress/commit/9e3f005))
* code line numbers (close: [#365](https://github.com/vuejs/vuepress/issues/365)) ([#379](https://github.com/vuejs/vuepress/issues/379)) ([9b42690](https://github.com/vuejs/vuepress/commit/9b42690))
* generate the timestamp of last updated for each doc (close [#258](https://github.com/vuejs/vuepress/issues/258)) ([#282](https://github.com/vuejs/vuepress/issues/282)) ([d9b290b](https://github.com/vuejs/vuepress/commit/d9b290b))
* handle telephone links ([#325](https://github.com/vuejs/vuepress/issues/325)) ([087467a](https://github.com/vuejs/vuepress/commit/087467a))
* header extraction improvement (close: [#238](https://github.com/vuejs/vuepress/issues/238)) ([#271](https://github.com/vuejs/vuepress/issues/271)) ([53c8489](https://github.com/vuejs/vuepress/commit/53c8489))
* hide edit link by page (close: [#284](https://github.com/vuejs/vuepress/issues/284)) ([#286](https://github.com/vuejs/vuepress/issues/286)) ([d46819c](https://github.com/vuejs/vuepress/commit/d46819c))
* highlight current region in sidebar ([#272](https://github.com/vuejs/vuepress/issues/272)) ([6b6d268](https://github.com/vuejs/vuepress/commit/6b6d268))
* last updated UI in default theme. ([#338](https://github.com/vuejs/vuepress/issues/338)) ([272df57](https://github.com/vuejs/vuepress/commit/272df57))
* make code type insensitive (close: [#347](https://github.com/vuejs/vuepress/issues/347)) ([5e87b65](https://github.com/vuejs/vuepress/commit/5e87b65))
* show OutboundLink icon for external links ([#428](https://github.com/vuejs/vuepress/issues/428)) ([942a2b9](https://github.com/vuejs/vuepress/commit/942a2b9))
* support disable navbar globally ([#246](https://github.com/vuejs/vuepress/issues/246)) ([e725ad2](https://github.com/vuejs/vuepress/commit/e725ad2))
* support global markdown config for attributes of external links ([#358](https://github.com/vuejs/vuepress/issues/358)) ([20e5bd8](https://github.com/vuejs/vuepress/commit/20e5bd8))
* support render $page.excerpt to HTML (close: [#458](https://github.com/vuejs/vuepress/issues/458)) ([9510b9f](https://github.com/vuejs/vuepress/commit/9510b9f))
* support style lang postcss (close: [#461](https://github.com/vuejs/vuepress/issues/461)) ([881199a](https://github.com/vuejs/vuepress/commit/881199a))
* using babel and support JSX in vue. (close: [#318](https://github.com/vuejs/vuepress/issues/318)) ([#336](https://github.com/vuejs/vuepress/issues/336)) ([82cd8bd](https://github.com/vuejs/vuepress/commit/82cd8bd))


### Performance Improvements

* vastly improve rebuild perf with caching ([dfdc00c](https://github.com/vuejs/vuepress/commit/dfdc00c))



<a name="0.8.4"></a>
## [0.8.4](https://github.com/vuejs/vuepress/compare/v0.8.3...v0.8.4) (2018-04-24)


### Bug Fixes

* algolia regression - missing options (close [#234](https://github.com/vuejs/vuepress/issues/234)) ([b19bd89](https://github.com/vuejs/vuepress/commit/b19bd89))


### Features

* support disable navbar via front matter (close: [#187](https://github.com/vuejs/vuepress/issues/187)) ([#232](https://github.com/vuejs/vuepress/issues/232)) ([504268c](https://github.com/vuejs/vuepress/commit/504268c))



<a name="0.8.3"></a>
## [0.8.3](https://github.com/vuejs/vuepress/compare/v0.8.2...v0.8.3) (2018-04-23)


### Bug Fixes

* always write override.style ([9861deb](https://github.com/vuejs/vuepress/commit/9861deb))



<a name="0.8.2"></a>
## [0.8.2](https://github.com/vuejs/vuepress/compare/v0.8.1...v0.8.2) (2018-04-23)


### Bug Fixes

* nav-item underline use $accentColor ([#230](https://github.com/vuejs/vuepress/issues/230)) ([ddb590d](https://github.com/vuejs/vuepress/commit/ddb590d))


### Features

* expose layout slots for injecting custom content ([3814e88](https://github.com/vuejs/vuepress/commit/3814e88))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/vuejs/vuepress/compare/v0.8.0...v0.8.1) (2018-04-23)


### Bug Fixes

* algolia regression (close [#228](https://github.com/vuejs/vuepress/issues/228)) ([44b1201](https://github.com/vuejs/vuepress/commit/44b1201))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/vuejs/vuepress/compare/v0.7.1...v0.8.0) (2018-04-23)


### Bug Fixes

* algolia check should be checking themeConfig.algolia ([504c21d](https://github.com/vuejs/vuepress/commit/504c21d))
* default to localhost on windows (close [#221](https://github.com/vuejs/vuepress/issues/221)) ([4d5c50e](https://github.com/vuejs/vuepress/commit/4d5c50e))
* fix emoji not showing on sidebars ([#206](https://github.com/vuejs/vuepress/issues/206)) ([bc2c83a](https://github.com/vuejs/vuepress/commit/bc2c83a))
* fix Sidebar link active logic ([#215](https://github.com/vuejs/vuepress/issues/215)) ([9c93d8f](https://github.com/vuejs/vuepress/commit/9c93d8f))
* Fix the style of repo link. ([f55fa00](https://github.com/vuejs/vuepress/commit/f55fa00))
* fix title inference regression (close [#208](https://github.com/vuejs/vuepress/issues/208)) ([52c20cf](https://github.com/vuejs/vuepress/commit/52c20cf))
* renames index.js to enhanceApp.js ([#226](https://github.com/vuejs/vuepress/issues/226)) ([0170449](https://github.com/vuejs/vuepress/commit/0170449))
* siteTitle vs pageTitle ([cd9b788](https://github.com/vuejs/vuepress/commit/cd9b788))


### Features

* Add docsRepo ([#155](https://github.com/vuejs/vuepress/issues/155)) ([716aefe](https://github.com/vuejs/vuepress/commit/716aefe))
* add max search suggestions config ([#163](https://github.com/vuejs/vuepress/issues/163)) ([a16a5b4](https://github.com/vuejs/vuepress/commit/a16a5b4))
* Algolia DocSearch Integration  ([#201](https://github.com/vuejs/vuepress/issues/201)) ([2f0da01](https://github.com/vuejs/vuepress/commit/2f0da01))
* also expose siteData in enhanceApp.js ([5157c6f](https://github.com/vuejs/vuepress/commit/5157c6f))
* expose all css pre-processor's options. (close [#169](https://github.com/vuejs/vuepress/issues/169)) ([#178](https://github.com/vuejs/vuepress/issues/178)) ([8f0755a](https://github.com/vuejs/vuepress/commit/8f0755a))
* support built-in pug config and document using pro-processors at component ([#151](https://github.com/vuejs/vuepress/issues/151)) ([f322105](https://github.com/vuejs/vuepress/commit/f322105))
* support excerpt extraction with `<!-- more -->` (close [#174](https://github.com/vuejs/vuepress/issues/174)) ([fa404dc](https://github.com/vuejs/vuepress/commit/fa404dc))
* support for TOML front matter ([#141](https://github.com/vuejs/vuepress/issues/141)) ([#164](https://github.com/vuejs/vuepress/issues/164)) ([70620ba](https://github.com/vuejs/vuepress/commit/70620ba))
* support toml config ([#138](https://github.com/vuejs/vuepress/issues/138)) ([d136e22](https://github.com/vuejs/vuepress/commit/d136e22))
* theme index enhancement support ([#154](https://github.com/vuejs/vuepress/issues/154)) ([d026801](https://github.com/vuejs/vuepress/commit/d026801))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/vuejs/vuepress/compare/v0.7.0...v0.7.1) (2018-04-20)


### Bug Fixes

* infer source link label from repo url ([#168](https://github.com/vuejs/vuepress/issues/168)) ([c1bbd05](https://github.com/vuejs/vuepress/commit/c1bbd05))
* Only add language dropdown when there has more than one locale configured. ([#181](https://github.com/vuejs/vuepress/issues/181)) ([7f311da](https://github.com/vuejs/vuepress/commit/7f311da))
* prioritize frontmatter's title, description and lang ([#180](https://github.com/vuejs/vuepress/issues/180)) ([384c5c7](https://github.com/vuejs/vuepress/commit/384c5c7)), closes [#177](https://github.com/vuejs/vuepress/issues/177) [#184](https://github.com/vuejs/vuepress/issues/184)
* redirect /foo to /foo/ during dev (close [#183](https://github.com/vuejs/vuepress/issues/183)) ([99bc0aa](https://github.com/vuejs/vuepress/commit/99bc0aa))
* show navbar in more conditions (close [#170](https://github.com/vuejs/vuepress/issues/170)) ([748fa7f](https://github.com/vuejs/vuepress/commit/748fa7f))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/vuejs/vuepress/compare/v0.6.1...v0.7.0) (2018-04-18)


### Bug Fixes

* disable typographer in markdown-it (close [#139](https://github.com/vuejs/vuepress/issues/139)) ([be42da5](https://github.com/vuejs/vuepress/commit/be42da5))
* ensure runnable when no locales are provided ([a25d86c](https://github.com/vuejs/vuepress/commit/a25d86c))
* fix yarn global install (fix [#102](https://github.com/vuejs/vuepress/issues/102)) ([1130318](https://github.com/vuejs/vuepress/commit/1130318))
* handle links with encoded hash ([f0a1a00](https://github.com/vuejs/vuepress/commit/f0a1a00))
* search for locales ([4cf1232](https://github.com/vuejs/vuepress/commit/4cf1232))


### Features

* adjust i18n config + documentation ([bccddbf](https://github.com/vuejs/vuepress/commit/bccddbf))
* i18n for edit link text ([6f5bac0](https://github.com/vuejs/vuepress/commit/6f5bac0))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/vuejs/vuepress/compare/v0.6.0...v0.6.1) (2018-04-18)


### Bug Fixes

* handle headers that start with numbers (fix [#121](https://github.com/vuejs/vuepress/issues/121)) ([ad83169](https://github.com/vuejs/vuepress/commit/ad83169))
* make search locale-scoped (close [#128](https://github.com/vuejs/vuepress/issues/128)) ([846eb59](https://github.com/vuejs/vuepress/commit/846eb59))
* **nav:** unexpected error when themeConfig.nav isn't given. (close: [#125](https://github.com/vuejs/vuepress/issues/125)) ([#127](https://github.com/vuejs/vuepress/issues/127)) ([f052472](https://github.com/vuejs/vuepress/commit/f052472))
* service worker path ([51c6eb2](https://github.com/vuejs/vuepress/commit/51c6eb2))
* use correct host in tip after the server has started ([#130](https://github.com/vuejs/vuepress/issues/130)) ([fd447ae](https://github.com/vuejs/vuepress/commit/fd447ae))
* use header's slug as it is if possible ([#119](https://github.com/vuejs/vuepress/issues/119)) ([5f7e199](https://github.com/vuejs/vuepress/commit/5f7e199))


### Features

* enable source map in build error traces ([efff472](https://github.com/vuejs/vuepress/commit/efff472))
* **sidebar:** support click the part outside sidebar to close the sidebar. ([#132](https://github.com/vuejs/vuepress/issues/132)) ([c6c71af](https://github.com/vuejs/vuepress/commit/c6c71af))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/vuejs/vuepress/compare/v0.5.1...v0.6.0) (2018-04-18)


### Bug Fixes

* allow viewport scaling (close [#110](https://github.com/vuejs/vuepress/issues/110)) ([2b2a07d](https://github.com/vuejs/vuepress/commit/2b2a07d))
* cli build --dest flag ([#97](https://github.com/vuejs/vuepress/issues/97)) ([e32d90b](https://github.com/vuejs/vuepress/commit/e32d90b))
* css safe ([#96](https://github.com/vuejs/vuepress/issues/96)) ([be82e09](https://github.com/vuejs/vuepress/commit/be82e09))
* **default-theme:** only show features div if provided ([3f76bfe](https://github.com/vuejs/vuepress/commit/3f76bfe))
* ensure using the same markdown config when extracting headers ([14d4d25](https://github.com/vuejs/vuepress/commit/14d4d25))
* handle index.md when checking relative links ([52d6672](https://github.com/vuejs/vuepress/commit/52d6672))


### Features

* Multiple Language Support + Complete Chinese Translation ([#48](https://github.com/vuejs/vuepress/issues/48)) ([8bbc5f3](https://github.com/vuejs/vuepress/commit/8bbc5f3))
* support yaml config ([#115](https://github.com/vuejs/vuepress/issues/115)) ([3088b3e](https://github.com/vuejs/vuepress/commit/3088b3e))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/vuejs/vuepress/compare/v0.5.0...v0.5.1) (2018-04-17)


### Bug Fixes

* correctly resolve not-found path ([#90](https://github.com/vuejs/vuepress/issues/90)) ([c3dd0b1](https://github.com/vuejs/vuepress/commit/c3dd0b1))
* meta viewport for iOS tap delay ([f95e245](https://github.com/vuejs/vuepress/commit/f95e245))
* support mailto links in NavLink + style tweaks (close [#93](https://github.com/vuejs/vuepress/issues/93)) ([62cd00e](https://github.com/vuejs/vuepress/commit/62cd00e))
* upgrade webpack-chain, fix css optimization settings (close [#91](https://github.com/vuejs/vuepress/issues/91)) ([1bbfa43](https://github.com/vuejs/vuepress/commit/1bbfa43))


### Features

* allow configuring host + default to 0.0.0.0 (close [#86](https://github.com/vuejs/vuepress/issues/86)) ([9936696](https://github.com/vuejs/vuepress/commit/9936696))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/vuejs/vuepress/compare/v0.4.2...v0.5.0) (2018-04-16)


### Features

* dropdown Items in Navbar ([#13](https://github.com/vuejs/vuepress/issues/13)) ([79f8f14](https://github.com/vuejs/vuepress/commit/79f8f14))
* enhanceApp.js ([#80](https://github.com/vuejs/vuepress/issues/80)) ([37ea038](https://github.com/vuejs/vuepress/commit/37ea038))
* support adding custom page class in front matter ([#85](https://github.com/vuejs/vuepress/issues/85)) ([40ca73c](https://github.com/vuejs/vuepress/commit/40ca73c)), closes [#84](https://github.com/vuejs/vuepress/issues/84)



<a name="0.4.2"></a>
## [0.4.2](https://github.com/vuejs/vuepress/compare/v0.4.1...v0.4.2) (2018-04-16)


### Bug Fixes

* proper minimum node version warning ([eb07685](https://github.com/vuejs/vuepress/commit/eb07685))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/vuejs/vuepress/compare/v0.4.0...v0.4.1) (2018-04-16)


### Bug Fixes

* always transpile lib directory ([#73](https://github.com/vuejs/vuepress/issues/73)) ([56e0392](https://github.com/vuejs/vuepress/commit/56e0392))
* avoid html-webpack-plugin requiring incompatible webpack internals ([4816bef](https://github.com/vuejs/vuepress/commit/4816bef))
* prioritize own deps + avoid serving wrong index.html (fix [#69](https://github.com/vuejs/vuepress/issues/69)) ([781e37a](https://github.com/vuejs/vuepress/commit/781e37a))
* redirect */index.html to */ (close [#83](https://github.com/vuejs/vuepress/issues/83)) ([52e04c4](https://github.com/vuejs/vuepress/commit/52e04c4))
* remove override import when ejecting (close [#56](https://github.com/vuejs/vuepress/issues/56)) ([2d811ed](https://github.com/vuejs/vuepress/commit/2d811ed))
* remove unnecessary spread ([63816c1](https://github.com/vuejs/vuepress/commit/63816c1))


### Features

* add `<kbd>` styles ([#60](https://github.com/vuejs/vuepress/issues/60)) ([580774b](https://github.com/vuejs/vuepress/commit/580774b))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/vuejs/vuepress/compare/v0.3.3...v0.4.0) (2018-04-15)


### Features

* allow default theme to be copied as custom theme ([98e1665](https://github.com/vuejs/vuepress/commit/98e1665))
* vuepress eject for customizing default theme ([89538fa](https://github.com/vuejs/vuepress/commit/89538fa))



<a name="0.3.3"></a>
## [0.3.3](https://github.com/vuejs/vuepress/compare/v0.3.2...v0.3.3) (2018-04-15)


### Bug Fixes

* fix outbound nav links (close [#37](https://github.com/vuejs/vuepress/issues/37)) ([c909007](https://github.com/vuejs/vuepress/commit/c909007))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/vuejs/vuepress/compare/v0.3.1...v0.3.2) (2018-04-15)


### Bug Fixes

* added escaping of meta tag attribute value ([#29](https://github.com/vuejs/vuepress/issues/29)) ([15a1ac8](https://github.com/vuejs/vuepress/commit/15a1ac8))
* escape text in code block when lang is text or not specified [#31](https://github.com/vuejs/vuepress/issues/31) ([#32](https://github.com/vuejs/vuepress/issues/32)) ([ac4acab](https://github.com/vuejs/vuepress/commit/ac4acab))
* **dev build:** use portfinder ([#30](https://github.com/vuejs/vuepress/issues/30)) ([f2a8229](https://github.com/vuejs/vuepress/commit/f2a8229)), closes [#26](https://github.com/vuejs/vuepress/issues/26)
* generate better slugs for non latin langs (close [#45](https://github.com/vuejs/vuepress/issues/45)) ([e08e3d2](https://github.com/vuejs/vuepress/commit/e08e3d2))
* hoistedTags may not always be present (close [#35](https://github.com/vuejs/vuepress/issues/35)) ([ed33515](https://github.com/vuejs/vuepress/commit/ed33515))
* home link '/' shouldn’t always stays active ([#47](https://github.com/vuejs/vuepress/issues/47)) ([67c758e](https://github.com/vuejs/vuepress/commit/67c758e))
* images should have 100% max width ([9e63974](https://github.com/vuejs/vuepress/commit/9e63974))
* renderChildren / sidebarDepth: 0 ([42f63a8](https://github.com/vuejs/vuepress/commit/42f63a8))


### Features

* add warning about node version on startup (close [#51](https://github.com/vuejs/vuepress/issues/51)) ([1118327](https://github.com/vuejs/vuepress/commit/1118327))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/vuejs/vuepress/compare/v0.3.0...v0.3.1) (2018-04-14)


### Bug Fixes

* **style:** prevent scrollbar in code ([#18](https://github.com/vuejs/vuepress/issues/18)) ([a3db4d2](https://github.com/vuejs/vuepress/commit/a3db4d2))
* code margin on mobile ([695440f](https://github.com/vuejs/vuepress/commit/695440f))


### Features

* commands now defaults targetDir to cwd. ([#25](https://github.com/vuejs/vuepress/issues/25)) ([22b7943](https://github.com/vuejs/vuepress/commit/22b7943)), closes [#8](https://github.com/vuejs/vuepress/issues/8)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/vuejs/vuepress/compare/v0.2.2...v0.3.0) (2018-04-14)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/vuejs/vuepress/compare/v0.2.1...v0.2.2) (2018-04-14)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/vuejs/vuepress/compare/v0.2.0...v0.2.1) (2018-04-14)


### Bug Fixes

* fix vuepress cant resolve custom theme under .vuepress/theme ([#3](https://github.com/vuejs/vuepress/issues/3)) ([133bdb3](https://github.com/vuejs/vuepress/commit/133bdb3))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/vuejs/vuepress/compare/v0.1.0...v0.2.0) (2018-04-13)


### Features

* auto detect invalid inbound links ([ca82906](https://github.com/vuejs/vuepress/commit/ca82906))
* google analytics ([764ccd5](https://github.com/vuejs/vuepress/commit/764ccd5))
* pwa ([664a8e0](https://github.com/vuejs/vuepress/commit/664a8e0))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/vuejs/vuepress/compare/890f929...v0.1.0) (2018-04-12)


### Bug Fixes

* css extraction ([d293194](https://github.com/vuejs/vuepress/commit/d293194))
* workaround for empty style chunk ([701658a](https://github.com/vuejs/vuepress/commit/701658a))


### Features

* dev server ([890f929](https://github.com/vuejs/vuepress/commit/890f929))
* support nesting in sidebar ([1964709](https://github.com/vuejs/vuepress/commit/1964709))
* support style/script hoisting + css modules ([f97e676](https://github.com/vuejs/vuepress/commit/f97e676))

