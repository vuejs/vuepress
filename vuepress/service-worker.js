/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "fa85d7d584dc7bea4455be2a5ffc2048"
  },
  {
    "url": "architecture.png",
    "revision": "9a93cf6cea38878e19c5816d1af28b17"
  },
  {
    "url": "assets/css/0.styles.6cc590e0.css",
    "revision": "6bd0dcdd1ab90caa74a8cb29ce06b346"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.90b6f866.js",
    "revision": "baa689abdb9628769f9a873d7b82d9a1"
  },
  {
    "url": "assets/js/11.bb178c57.js",
    "revision": "73739560bf7dc62e7a392fac77f2b450"
  },
  {
    "url": "assets/js/12.1501540a.js",
    "revision": "c8938a46563a73f5c08b05e6514fa3c7"
  },
  {
    "url": "assets/js/13.6e978c39.js",
    "revision": "da95f21e9b3ac8f07d729193e4106e98"
  },
  {
    "url": "assets/js/14.136ae6a3.js",
    "revision": "e2752338b4e9be2e6b71c7d141126505"
  },
  {
    "url": "assets/js/15.0c645d16.js",
    "revision": "ed70fec3995440ff9d3946cdb08a07e1"
  },
  {
    "url": "assets/js/16.8741a547.js",
    "revision": "5e48e1bb4ece2f3d500c5f9809bc6470"
  },
  {
    "url": "assets/js/17.5e50cd1d.js",
    "revision": "8e3b449a7ee4ea493a6c6f8334ab385e"
  },
  {
    "url": "assets/js/18.790476d7.js",
    "revision": "6cf09cc57e7a877e4a3b315d4d2a83af"
  },
  {
    "url": "assets/js/19.6749c256.js",
    "revision": "98dc52f86bde09e7aae3c940c7e7a3e1"
  },
  {
    "url": "assets/js/2.9a3d3cef.js",
    "revision": "8f36f4f50f53fd00748dee7f8d95f74f"
  },
  {
    "url": "assets/js/20.52144952.js",
    "revision": "04f2e8f439504d7c9571438a5dd14e79"
  },
  {
    "url": "assets/js/21.a733da80.js",
    "revision": "9d570cde10bf28f221982a16f1fcaec4"
  },
  {
    "url": "assets/js/22.cca14839.js",
    "revision": "0003a5af94cf3233151ac8136ca4c87c"
  },
  {
    "url": "assets/js/23.d93cc55b.js",
    "revision": "f672411658c2b638fd3c3d074c3634d3"
  },
  {
    "url": "assets/js/24.1e5b5d2a.js",
    "revision": "d3803e4ec183798b5d443015319d0024"
  },
  {
    "url": "assets/js/25.7c13839d.js",
    "revision": "04230a8dd0494905af2131bfcd3f1ec8"
  },
  {
    "url": "assets/js/26.2a3806b6.js",
    "revision": "a511473e7f4044e28bc4f249f958af22"
  },
  {
    "url": "assets/js/27.c450e6fb.js",
    "revision": "3e4d7ad2e8045ed8a5c3c7ad1e3f3446"
  },
  {
    "url": "assets/js/28.9169fe43.js",
    "revision": "b26f8485e6658795b0ad641111980263"
  },
  {
    "url": "assets/js/29.0a1ff843.js",
    "revision": "cefc989e840a2ed4c00a1c78dce7fc93"
  },
  {
    "url": "assets/js/3.be112e9f.js",
    "revision": "17a762cec95508edfaeff0ff0bf080f1"
  },
  {
    "url": "assets/js/30.25e010af.js",
    "revision": "9c57108104600183d57c2cf47c671311"
  },
  {
    "url": "assets/js/31.effc1422.js",
    "revision": "28fbe26659b3c702cb95a01c8ce3dc56"
  },
  {
    "url": "assets/js/32.86f38218.js",
    "revision": "3c16da411556e13ec0eb1e37d40e2f61"
  },
  {
    "url": "assets/js/33.0fab7803.js",
    "revision": "0bb25e3f7d10b89319beb5fe0163bcb0"
  },
  {
    "url": "assets/js/34.5e0d5a74.js",
    "revision": "64db1e68580a94f63fb13edca681f0c6"
  },
  {
    "url": "assets/js/35.e4e7fe67.js",
    "revision": "09d144be64f0b067c423a35e6c62d4a6"
  },
  {
    "url": "assets/js/36.ca792103.js",
    "revision": "df99e4d75db81e6893a882ac5e1595e8"
  },
  {
    "url": "assets/js/37.6d74e878.js",
    "revision": "d9baa21dc9d3e1acf031989b144f9e0e"
  },
  {
    "url": "assets/js/38.a1c5df9a.js",
    "revision": "2084401a86b23a4f6c48c39e10b29e9f"
  },
  {
    "url": "assets/js/39.b0d2ff36.js",
    "revision": "5a2efb3750d6b054690d19a957ec0b6d"
  },
  {
    "url": "assets/js/4.d16007cf.js",
    "revision": "fa5ecdabe72e4c06a09ef2d1fd5fec71"
  },
  {
    "url": "assets/js/40.af5932b9.js",
    "revision": "6596306c2956a0d82afdd135ea0c81bc"
  },
  {
    "url": "assets/js/41.e26383c5.js",
    "revision": "561161e8444a9214944b32389c7242aa"
  },
  {
    "url": "assets/js/42.bf69bddd.js",
    "revision": "a8649c156b20bb2c6fa464e2b198f15b"
  },
  {
    "url": "assets/js/43.c0368a24.js",
    "revision": "dd840c3db11236d97a3b9a21eb199ef7"
  },
  {
    "url": "assets/js/44.d601f92a.js",
    "revision": "66e712829e4a40a4be80a3bf396de919"
  },
  {
    "url": "assets/js/45.5939c636.js",
    "revision": "8e74b3fadcc2484a6f7312c948142d16"
  },
  {
    "url": "assets/js/46.2bc10ed6.js",
    "revision": "e97566d0704aa655aff9d594cf4adfc2"
  },
  {
    "url": "assets/js/47.15e6f040.js",
    "revision": "d07f333d2cb815fbf033e49fe412241e"
  },
  {
    "url": "assets/js/48.a114b415.js",
    "revision": "844fa3a19240f33680552c85cfb16a6a"
  },
  {
    "url": "assets/js/49.a51c6fdf.js",
    "revision": "392bc4dc5323204abbc0cb8cd887dfbe"
  },
  {
    "url": "assets/js/5.18c31fb7.js",
    "revision": "9fec2400e0d8d81ced30148764cf6753"
  },
  {
    "url": "assets/js/50.ed42f747.js",
    "revision": "f87379a4a5b6ec24644727e0d28c0154"
  },
  {
    "url": "assets/js/51.f6a2c8b3.js",
    "revision": "00e531e431d66e6406d9ff9b2c7201a4"
  },
  {
    "url": "assets/js/52.522513d8.js",
    "revision": "68ff330e415772fff7d6de0c297dc1e9"
  },
  {
    "url": "assets/js/53.2bdd820d.js",
    "revision": "1a9395f61d62c49923858a7c96a441ab"
  },
  {
    "url": "assets/js/54.15937a2d.js",
    "revision": "03f4971b204f13ba08ad1827f30acd9c"
  },
  {
    "url": "assets/js/55.d78fbc49.js",
    "revision": "563ba99e1767d48c4f2b55ae6faa03c7"
  },
  {
    "url": "assets/js/56.934f8911.js",
    "revision": "0aa12e4a99331c67efb5a14f45942025"
  },
  {
    "url": "assets/js/57.f2538317.js",
    "revision": "d0e925f4b9dbd68ce7088db4bb78b881"
  },
  {
    "url": "assets/js/58.f465a17a.js",
    "revision": "4dc2bb50bef801f593558fd225f63e40"
  },
  {
    "url": "assets/js/59.00cd99d8.js",
    "revision": "37fa2d1810afca0b53640a141ba8a3b6"
  },
  {
    "url": "assets/js/6.8ca9ae3b.js",
    "revision": "1551893be82c11a67eae83eef9191080"
  },
  {
    "url": "assets/js/60.e2e817e9.js",
    "revision": "b1608481edb2bad2b5979f8af84a860e"
  },
  {
    "url": "assets/js/61.e351f282.js",
    "revision": "ac6f224dfeebac73d202dd4fead73f9d"
  },
  {
    "url": "assets/js/62.7cb85843.js",
    "revision": "bdc89ce1359c712ffe0139b1829880e7"
  },
  {
    "url": "assets/js/63.7a736cf3.js",
    "revision": "268298729dada6031f410a91f8506b63"
  },
  {
    "url": "assets/js/64.589ebe9e.js",
    "revision": "03414faefc2c257ca726335e9b0fb724"
  },
  {
    "url": "assets/js/65.c7b9d4e8.js",
    "revision": "0ddc4df55b4c5ce6363a9a06a152a85a"
  },
  {
    "url": "assets/js/66.ee83944c.js",
    "revision": "75096f9ce12c38c73e0fba0e98e08a43"
  },
  {
    "url": "assets/js/67.1b7b5854.js",
    "revision": "eb2676966d3935920905dbd9d232fc60"
  },
  {
    "url": "assets/js/68.b4e58228.js",
    "revision": "b4688404a5db120f551f7cd6f0aa9aac"
  },
  {
    "url": "assets/js/69.73f71dfd.js",
    "revision": "85975294dc9c5786add3b25e0e3c8f06"
  },
  {
    "url": "assets/js/7.6d6f900c.js",
    "revision": "9534a88e035528d410f1940a923eef5f"
  },
  {
    "url": "assets/js/70.d0ec8013.js",
    "revision": "4ef52d9ecccc1d3a2498dc48b6b5b497"
  },
  {
    "url": "assets/js/71.34cb1f27.js",
    "revision": "e5fa8ca5a4fb1337d0dbea1094cdfce5"
  },
  {
    "url": "assets/js/72.6528f86e.js",
    "revision": "5758b850b6323680e6874db3f9a9e85e"
  },
  {
    "url": "assets/js/73.ceac5146.js",
    "revision": "28c1fd2556e9c8138b72c978ce56a964"
  },
  {
    "url": "assets/js/74.907fe0dc.js",
    "revision": "0ba63e8907a0bcd6d2b637b2681d42c0"
  },
  {
    "url": "assets/js/75.3ff1a49a.js",
    "revision": "ac47b888beb64a8dbe8fcf4e40dec2e9"
  },
  {
    "url": "assets/js/76.22069a19.js",
    "revision": "501eb60ccfc6b27c19dcbe66ca8879ac"
  },
  {
    "url": "assets/js/77.8c5d4344.js",
    "revision": "fbf4c1a19c791b4ef1e1ef1f3d49c992"
  },
  {
    "url": "assets/js/78.79c9fb4c.js",
    "revision": "c846da8dec28af9a9d0604d6521ad4a4"
  },
  {
    "url": "assets/js/79.776ba4c9.js",
    "revision": "53982c838f805eee1f01c365fac3e75c"
  },
  {
    "url": "assets/js/8.a7e0b975.js",
    "revision": "a16c175ab2f5c3598688645205202887"
  },
  {
    "url": "assets/js/80.c82818bd.js",
    "revision": "1c18b0194c0dc1ccaf75bb54d5159149"
  },
  {
    "url": "assets/js/81.95ebb7bf.js",
    "revision": "2eb079b0615bd30b993f709bd1c90a33"
  },
  {
    "url": "assets/js/82.230a5beb.js",
    "revision": "20a65a9601fa45935dfddb89673688ef"
  },
  {
    "url": "assets/js/83.ca9f99e0.js",
    "revision": "3fc78085ef318e696f286a6302b38145"
  },
  {
    "url": "assets/js/84.4ef99674.js",
    "revision": "9b4c1ed5f55605b9d207734e272b6040"
  },
  {
    "url": "assets/js/85.05d2f860.js",
    "revision": "e66366cf0a5f40c935438c08bddaa0b8"
  },
  {
    "url": "assets/js/86.a3020788.js",
    "revision": "e67563bad632624a294381dc6c21e561"
  },
  {
    "url": "assets/js/87.f276c65b.js",
    "revision": "c1fda4ce5ee7a305dfefa02d619d987d"
  },
  {
    "url": "assets/js/88.4a8aea21.js",
    "revision": "130ce7a99b096690d858ce0465aa886b"
  },
  {
    "url": "assets/js/89.b51fcc0a.js",
    "revision": "ff567f7a8b7ebdd80137e2d6a4a977bb"
  },
  {
    "url": "assets/js/9.164bd82f.js",
    "revision": "22b86469c3c00300eb63037624cf00e4"
  },
  {
    "url": "assets/js/90.3bdc019a.js",
    "revision": "77f53ed52ba683eae81ed34dedb0ec63"
  },
  {
    "url": "assets/js/91.cd31807c.js",
    "revision": "3ad0b2398bc237a8bc39601c9e5ed3a1"
  },
  {
    "url": "assets/js/92.a4808ccd.js",
    "revision": "b5ebfdfb9a829d16f07a849e612b1c72"
  },
  {
    "url": "assets/js/93.09fb2654.js",
    "revision": "c3ef659b3480519b1f6148a974bf55dc"
  },
  {
    "url": "assets/js/94.c8b3bda3.js",
    "revision": "6e2d24678172976fb12497f959b57a88"
  },
  {
    "url": "assets/js/95.36017126.js",
    "revision": "0eec52d853cbc9b3b8a3f9541a97e416"
  },
  {
    "url": "assets/js/app.8ac36d9d.js",
    "revision": "97c608a56e8a18fdb5b4d0ecddbb31d9"
  },
  {
    "url": "assets/js/vendors~docsearch.67496cf7.js",
    "revision": "659afd0c7550d3ee568dd4d7d06cdbd8"
  },
  {
    "url": "assets/js/vendors~notification.cb8b10f9.js",
    "revision": "00ced81f12eeb0e26ed044184aa6937f"
  },
  {
    "url": "config/index.html",
    "revision": "b7a81a37616486c4429eb6dd0560cf5b"
  },
  {
    "url": "faq/index.html",
    "revision": "1d3ac7493d1540d62ba0ffc895052307"
  },
  {
    "url": "guide/assets.html",
    "revision": "d84367c86062c14277646097d3d9b235"
  },
  {
    "url": "guide/basic-config.html",
    "revision": "07286349125f16cbe49bf7882a9ca84c"
  },
  {
    "url": "guide/deploy.html",
    "revision": "e30ff3b60e85048f0b66d6fe0e0b19d4"
  },
  {
    "url": "guide/directory-structure.html",
    "revision": "c6af70dfc4936ab5ed4cc75163401cdd"
  },
  {
    "url": "guide/frontmatter.html",
    "revision": "6dcfeda6a1dc8929aa7e75fa164d1fa3"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "401b8427f75f9f3841368abaf1fd7ca9"
  },
  {
    "url": "guide/global-computed.html",
    "revision": "47e8d4e58c62af09297b0ed5965c4906"
  },
  {
    "url": "guide/i18n.html",
    "revision": "3c3391bd5d94c31f6b25612c2c4c9004"
  },
  {
    "url": "guide/index.html",
    "revision": "caf1fc989c0b72acbc3ea14786131cd4"
  },
  {
    "url": "guide/markdown-slot.html",
    "revision": "daae60b387296bb945bf03d151034484"
  },
  {
    "url": "guide/markdown.html",
    "revision": "6e85b3be9d3aca88a3786ece21ae155a"
  },
  {
    "url": "guide/permalinks.html",
    "revision": "85cb479e78190d9f673abfd3e81add87"
  },
  {
    "url": "guide/using-vue.html",
    "revision": "81fce031e358cf3d1b67428c35bf4739"
  },
  {
    "url": "hero.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "index.html",
    "revision": "632c9e52be433b4d03f73cc0e1c48a21"
  },
  {
    "url": "line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "logo.png",
    "revision": "cf23526f451784ff137f161b8fe18d5a"
  },
  {
    "url": "miscellaneous/design-concepts.html",
    "revision": "d39c4009169b889790bceecfc2882547"
  },
  {
    "url": "miscellaneous/glossary.html",
    "revision": "849627787b08757555ea19e0dc7453de"
  },
  {
    "url": "miscellaneous/migration-guide.html",
    "revision": "ecf1dd55008b979304db7e280146f957"
  },
  {
    "url": "plugin.png",
    "revision": "3e325210d3e3752e32818385fc4afbc9"
  },
  {
    "url": "plugin/context-api.html",
    "revision": "5e0b10c1d47cb55274f2e2b55cca4242"
  },
  {
    "url": "plugin/index.html",
    "revision": "b1014ca7b7d720ebf6e88930fa892a3b"
  },
  {
    "url": "plugin/life-cycle.html",
    "revision": "3cb229231a105366b8dd3582dd42b11a"
  },
  {
    "url": "plugin/official/plugin-active-header-links.html",
    "revision": "da717b44371f3206814f10ad1a3bd564"
  },
  {
    "url": "plugin/official/plugin-back-to-top.html",
    "revision": "9d521caa4bbab7f850132d1196c63ebd"
  },
  {
    "url": "plugin/official/plugin-blog.html",
    "revision": "9266dc421455a31575c857950fd644f1"
  },
  {
    "url": "plugin/official/plugin-google-analytics.html",
    "revision": "422cbf94c8567673979a5b37bd26c817"
  },
  {
    "url": "plugin/official/plugin-i18n-ui.html",
    "revision": "33e2e7a2d495c73cf5a8b10258cb2b8c"
  },
  {
    "url": "plugin/official/plugin-last-updated.html",
    "revision": "560087e5ff2ef4efa6e9e5363c3e8160"
  },
  {
    "url": "plugin/official/plugin-medium-zoom.html",
    "revision": "dc2e5c750f9376883491a0d7f99f4d2c"
  },
  {
    "url": "plugin/official/plugin-pagination.html",
    "revision": "d4dd56e12537af3ce5b1c0ddf53a636a"
  },
  {
    "url": "plugin/official/plugin-pwa.html",
    "revision": "a4b2226a1e1ca842c8d6c4b76d79015f"
  },
  {
    "url": "plugin/official/plugin-register-components.html",
    "revision": "4e27173ce445803b798cd375f9337510"
  },
  {
    "url": "plugin/official/plugin-search.html",
    "revision": "deb67a05fe2d106b31c9b66a1302427e"
  },
  {
    "url": "plugin/option-api.html",
    "revision": "c0772acf1541990d3d267569e9c41a55"
  },
  {
    "url": "plugin/using-a-plugin.html",
    "revision": "3dc05a410c43722ffd4cfc4936bda571"
  },
  {
    "url": "plugin/writing-a-plugin.html",
    "revision": "6c67cdb90d51e50cb45918f902a2fb52"
  },
  {
    "url": "theme/default-theme-config.html",
    "revision": "0141cf9ef5029d491dd371794f6c8561"
  },
  {
    "url": "theme/index.html",
    "revision": "5a1c52c80bcc779abec2670acd918555"
  },
  {
    "url": "theme/option-api.html",
    "revision": "c030fba86f46b9cef2cd5c0ab264500f"
  },
  {
    "url": "theme/using-a-theme.html",
    "revision": "cce70d0d57916a763d1eb8338a740bf4"
  },
  {
    "url": "theme/writing-a-theme.html",
    "revision": "91ae26ef2b10c736b5989e2eb8c4c697"
  },
  {
    "url": "zh/config/index.html",
    "revision": "1699d7bd1b268e874774b93caae49a17"
  },
  {
    "url": "zh/faq/index.html",
    "revision": "f7331834570b88cee9ff8bc05b4fe25c"
  },
  {
    "url": "zh/guide/assets.html",
    "revision": "f9a0c90d064b072c73592ab0837cf388"
  },
  {
    "url": "zh/guide/basic-config.html",
    "revision": "68bd961fa238fef745801ee4d63592f5"
  },
  {
    "url": "zh/guide/deploy.html",
    "revision": "d95c3eb567f93a7d006fd189f56b646c"
  },
  {
    "url": "zh/guide/directory-structure.html",
    "revision": "22a48889091a610b9f0f0fa699582b65"
  },
  {
    "url": "zh/guide/frontmatter.html",
    "revision": "37e5830c3be190b36d3947536b326c8b"
  },
  {
    "url": "zh/guide/getting-started.html",
    "revision": "9e0513e53efe03cbf848c47ecb91cc4f"
  },
  {
    "url": "zh/guide/global-computed.html",
    "revision": "95fce1273c97e8dfc619f5a2bf0e8447"
  },
  {
    "url": "zh/guide/i18n.html",
    "revision": "2c3f98b49bd53cc0e10b9960e25b3dc2"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "3357aefd585f1addd94a60e77ebb0101"
  },
  {
    "url": "zh/guide/markdown-slot.html",
    "revision": "3a61e2ce8a2f826bbef4bc60280b7fcb"
  },
  {
    "url": "zh/guide/markdown.html",
    "revision": "d9decb4dc5f80b34a85def46ee6d983d"
  },
  {
    "url": "zh/guide/permalinks.html",
    "revision": "c49eeee8ccd8e4a534d192e5f1f45190"
  },
  {
    "url": "zh/guide/using-vue.html",
    "revision": "962e94bcc75d3fb87f1f74ffad529c80"
  },
  {
    "url": "zh/index.html",
    "revision": "7ab9882dc945794d05184c0966a31f2a"
  },
  {
    "url": "zh/miscellaneous/design-concepts.html",
    "revision": "843e71d6fa2ee6196f1c43b52528b077"
  },
  {
    "url": "zh/miscellaneous/glossary.html",
    "revision": "ea076a62eb0c76c0df2d13418462b310"
  },
  {
    "url": "zh/miscellaneous/migration-guide.html",
    "revision": "024c039454c4f2c11f398906b276531d"
  },
  {
    "url": "zh/plugin/context-api.html",
    "revision": "be072de787697b382d46af538fdaf296"
  },
  {
    "url": "zh/plugin/index.html",
    "revision": "4be1e32d297fab68758fb5ea10978e82"
  },
  {
    "url": "zh/plugin/life-cycle.html",
    "revision": "02174c5484d38540bb6dcedf9ece56ab"
  },
  {
    "url": "zh/plugin/official/plugin-active-header-links.html",
    "revision": "937792345753be9af4229a2a6d4a096a"
  },
  {
    "url": "zh/plugin/official/plugin-back-to-top.html",
    "revision": "74e0e44ee8967084add1225b13949082"
  },
  {
    "url": "zh/plugin/official/plugin-blog.html",
    "revision": "59b36a164fbc5beab3d3700bb3b8f621"
  },
  {
    "url": "zh/plugin/official/plugin-google-analytics.html",
    "revision": "5140b0815403c2ff96d062e6a379c01c"
  },
  {
    "url": "zh/plugin/official/plugin-i18n-ui.html",
    "revision": "468357cc64f011665b9357c7f064ade6"
  },
  {
    "url": "zh/plugin/official/plugin-last-updated.html",
    "revision": "17312166f6d80eb326c879264e711cc3"
  },
  {
    "url": "zh/plugin/official/plugin-medium-zoom.html",
    "revision": "aeab486788fb9c87044fa837f2e98efd"
  },
  {
    "url": "zh/plugin/official/plugin-pagination.html",
    "revision": "aff976c9b6a9476ef61c83eb22d40c9d"
  },
  {
    "url": "zh/plugin/official/plugin-pwa.html",
    "revision": "0f2d12dbb16197f3adfddbc42cece8b1"
  },
  {
    "url": "zh/plugin/official/plugin-register-components.html",
    "revision": "65341ff633d458f0e2bcd677c5824bd5"
  },
  {
    "url": "zh/plugin/official/plugin-search.html",
    "revision": "784ec689d697abc9f7b6e484d7ca1100"
  },
  {
    "url": "zh/plugin/option-api.html",
    "revision": "716ff8329035fa3d9344d3b4d9fbedf2"
  },
  {
    "url": "zh/plugin/using-a-plugin.html",
    "revision": "da63ac0e04602445b84261b2f835c9cd"
  },
  {
    "url": "zh/plugin/writing-a-plugin.html",
    "revision": "24fc7ead58dc52ef741253caf6393725"
  },
  {
    "url": "zh/theme/default-theme-config.html",
    "revision": "2feaf9feb65e534c6c120f00098bf37f"
  },
  {
    "url": "zh/theme/index.html",
    "revision": "2a6654da6f8900976d4f08fc2c60addc"
  },
  {
    "url": "zh/theme/option-api.html",
    "revision": "06c4f78e4a4fce8ea91b11a74ceb02b5"
  },
  {
    "url": "zh/theme/using-a-theme.html",
    "revision": "ab8fa97cd9ef862be9731e665ac46191"
  },
  {
    "url": "zh/theme/writing-a-theme.html",
    "revision": "c3fdc7c3c5c4dfe77cfdba2fef0f33a4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
