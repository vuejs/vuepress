module.exports = {
  // 指定 vuepress build 的输出目录，默认值: .vuepress/dist
  dest: 'vuepress',
  // 提供多语言支持的语言配置。配置多语言支持时，默认在导航栏生成选择菜单
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'Hello! VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      // 将会被设置为 <html> 的 lang 属性
      lang: 'zh-CN',
      // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。
      title: '你好! VuePress',
      // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  // 设置被注入到当前页面的 HTML <head> 中的标签，每个标签都可以以 [tagName, { attrName: attrValue }, innerHTML?] 的格式指定。
  head: [
    // 例：下面配置在html中，将以 <link rel="icon" href="/logo.png"> 的形式存在。
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 例：下面配置在html中，将以 <meta name="theme-color" content="#3eaf7c"> 的形式存在。
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  // 用于离线缓存
  serviceWorker: true,
  // 设置自定义主题
  //theme: 'vue',
  // 当前主题的一些配置
  themeConfig: {
    // github配置，themeConfig.repo 选项将会自动在每个页面的导航栏生成生成一个 GitHub 链接
    repo: 'vuejs/vuepress',
    // 以及在页面的底部生成一个 "Edit this page" 链接。
    editLinks: false,
    // 文档目录
    docsDir: 'docs',
    // 默认主题多语言配置
    locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          { text:'Guide', link:'/guide/' },
          { text:'Config Reference', link:'/config/' },
          { text:'Default Theme Config', link:'/default-theme-config/' }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 页面底部生成的编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        // 页面导航栏链接
        nav: [
          // 配置菜单链接
          { text: '指南', link: '/zh/guide/' },
          { text: '配置', link: '/zh/config/' },
          { text: '默认主题', link: '/zh/default-theme-config/' }
          // 可以通过下面的方式配置下拉菜单；同样，下拉菜单中还可以继续配置菜单分组。
          // {text:'Languages',items:[{text:'Link1',link:'/language/chinese'},{text:'Link2',link:'/language/japanese'}]}
          // {text:'Languages',items:[{text:'Group1',items:[/**/]},{text:'Group2',items:[/**/]}]}
        ],
        // 侧边栏（Sidebar）基本的配置。sidebar支持多种配置方式：
        // 1.链接数组；使用链接数组时，需要指定全路径。如：中文环境下为'/zh/guide/'。以 / 结尾的路径将会被视为 */README.md。
        // 2.自动生成侧栏；如：sidebar: auto
        // 3.侧边栏分组
        // 4.多个侧边栏，配置如下:
        sidebar: {
          '/zh/guide/': genSidebarConfig('指南')
        }
      }
    },
    // 禁用所有页面的导航栏。目前在dev模式下测试此设置未生效
    // 可以通过 YAML front matter 来禁用某个指定页面的导航栏
    navbar: false,
    // 默认情况下，侧边栏会自动地显示由当前页面标的题（headers）组成的的链接，并按照页面本身的结构进行嵌套，你可以通过 themeConfig.sidebarDepth 来修改它的行为。
    // 默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
    // 也可以使用 YAML front matter 来为某个页面重写此值
    sidebarDepth:2,
    // 设置默认搜索框
    search: true,
    // 默认搜索框显示的搜索结果数量
    // searchMaxSuggestions: 10,
    // Algolia 全站搜索
/*     algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }, */
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'custom-themes',
        'i18n',
        'deploy'
      ]
    }
  ]
}
