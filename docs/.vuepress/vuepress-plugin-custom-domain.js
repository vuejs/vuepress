const path = require('path')
const fs = require('fs')

module.exports = async function vuepressPluginCustomDomain({ outDir, pluginOptions: { domain } }) {
  if (process.env.NODE_ENV === 'production') {
    await fs.writeFile(path.resolve(outDir, 'CHAME'), domain, 'utf-8')
  }
}
