module.exports = async (api, projectOptions) => {
  api.extendPackage({
    scripts: {
      'docs:dev': 'vuepress dev docs',
      'docs:build': 'vuepress build docs'
    },
    devDependencies: {
      vuepress: '^1.1.0'
    }
  })

  api.render('./template', projectOptions)
}
