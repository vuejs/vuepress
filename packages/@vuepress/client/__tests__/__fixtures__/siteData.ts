export const siteData = {
  base: '/',
  lang: 'en-US',
  title: '',
  description: '',
  head: [],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        tip: 'TIP',
        warning: 'WARNING',
        danger: 'WARNING',
        notFound: [
          "There's nothing here.",
          'How did we get here?',
          "That's a Four-Oh-Four.",
          "Looks like we've got some broken links.",
        ],
        backToHome: 'Take me home',
        openInNewWindow: 'open in new window',
      },
      '/zh/': {
        info: '提示',
        warning: '注意',
        danger: '警告',
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        openInNewWindow: '在新窗口打开',
      },
    },
  },
}
