const path = require('path')
const fs = require('fs-extra')

module.exports = async function vuepressPluginCustomDomain({ domain }) {
  this

  .ready(() => {
    console.log('Used vuepress-plugin-custom-domain')
  })

  .compiled(async ({ outDir }) => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }
    await fs.ensureDir(outDir)
    await fs.writeFile(path.resolve(outDir, 'CHAME'), domain, 'utf-8')
    console.log('Generated CHAME file.')
  })

  .updated(() => {
    console.log('Updated')
  })
}
