module.exports = {
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    repo: 'vuejs/vuepress',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        notFoundLinkText: 'Take me home.',
        notFoundMessages: [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links."
        ]
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        notFoundLinkText: 'Take me home.',
        notFoundMessages: [
          "There's nothing here.",
          "How did we get here?",
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links."
        ]
      }
    }
  }
}
