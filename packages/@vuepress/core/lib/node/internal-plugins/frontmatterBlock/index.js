module.exports = () => ({
  name: '@vuepress/internal-frontmatter-block',

  chainWebpack (config) {
    config
      .module
        .rule('frontmatter-block')
          .resourceQuery(/blockType=frontmatter/)
          .use('frontmatter-block-loader')
            .loader(require.resolve('./loader.js'))
  }
})
