const { fs, path } = require("@vuepress/shared-utils");

module.exports = ctx => ({
  dest: "../../vuepress",
  locales: {
    "/": {
      lang: "en-US",
      title: "VuePress 1.x",
      description: "Vue-powered Static Site Generator"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "VuePress 1.x",
      description: "Vue 驱动的静态网站生成器"
    }
  },
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png"
      }
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }]
  ],
  theme: "@vuepress/vue",
  themeConfig: {
    repo: "vuejs/vuepress",
    editLinks: true,
    docsDir: "packages/docs/docs",
    // #697 Provided by the official algolia team.
    // algolia: ctx.isProd ? ({
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // }) : null,
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: require("./nav/en"),
        sidebar: {
          "/guide/": getGuideSidebar("Guide", "Advanced"),
          "/plugin/market/": getPluginMarketSidebar(),
          "/plugin/": getPluginSidebar("Plugin", "Introduction"),
          "/theme/market/": getPluginMarketSidebar(),
          "/theme/": getThemeSidebar("Theme", "Introduction")
        }
      },
      "/zh/": {
        label: "简体中文",
        selectText: "选择语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: require("./nav/zh"),
        sidebar: {
          "/zh/guide/": getGuideSidebar("指南", "深入"),
          "/zh/plugin/": getPluginSidebar("插件", "介绍"),
          "/zh/theme/": getThemeSidebar("主题", "介绍")
        }
      }
    }
  },
  plugins: [
    ["@vuepress/back-to-top", true],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ["@vuepress/medium-zoom", true],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-128189152-1"
      }
    ],
    [
      "container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>"
      }
    ],
    [
      "container",
      {
        type: "upgrade",
        before: info => `<UpgradePath title="${info}">`,
        after: "</UpgradePath>"
      }
    ]
  ],
  extraWatchFiles: [".vuepress/nav/en.js", ".vuepress/nav/zh.js"]
});

function getGuideSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        "",
        "getting-started",
        "directory-structure",
        "basic-config",
        "assets",
        "markdown",
        "using-vue",
        "i18n",
        "deploy"
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        "frontmatter",
        "permalinks",
        "markdown-slot",
        "global-computed"
      ]
    }
  ];
}

function getPluginSidebar(pluginTitle, pluginIntro) {
  return [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ["", pluginIntro],
        "using-a-plugin",
        "writing-a-plugin",
        "life-cycle",
        "option-api",
        "context-api"
      ]
    }
  ];
}

function getPluginMarketSidebar() {
  return [
    {
      title: "Plugins",
      collapsable: true,
      children: [
        {
          title: "Official",
          collapsable: true,
          children: [
            "/plugin/market/official/plugin-active-header-links",
            "/plugin/market/official/plugin-back-to-top",
            "/plugin/market/official/plugin-google-analytics",
            "/plugin/market/official/plugin-last-updated",
            "/plugin/market/official/plugin-medium-zoom",
            "/plugin/market/official/plugin-nprogress",
            "/plugin/market/official/plugin-pwa",
            "/plugin/market/official/plugin-register-components",
            "/plugin/market/official/plugin-search"
          ]
        },
        {
          title: "Community",
          collapsable: true,
          children: [
            [
              "/plugin/market/before-writing-plugin",
              "You want to create a plugin ?"
            ]
          ]
        }
      ]
    },
    {
      title: "Themes",
      collapsable: true,
      children: [
        {
          title: "Official",
          collapsable: true,
          children: ["/theme/market/official/default-theme"]
        },
        {
          title: "Community",
          collapsable: true,
          children: [
            [
              "/theme/market/before-writing-theme",
              "You want to create a theme ?"
            ]
          ]
        }
      ]
    }
  ];
}

function getThemeSidebar(groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ["", introductionA],
        "using-a-theme",
        "writing-a-theme",
        "option-api",
        "default-theme-config",
        "inheritance"
      ]
    }
  ];
}
