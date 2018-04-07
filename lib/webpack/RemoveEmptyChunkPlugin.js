// https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
module.exports = class Plugin {
  apply (compiler) {
    compiler.hooks.emit.tap('vuepress-remove-empty-chunk', compilation => {
      Object.keys(compilation.assets).forEach(name => {
        if (/_assets\/js\/styles\.\w{8}\.js$/.test(name)) {
          delete compilation.assets[name]
        }
      })
    })
  }
}
