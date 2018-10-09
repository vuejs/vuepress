const puppeteer = require('puppeteer')
const PDFMerge = require('easy-pdf-merge')
const { path, fs, logger } = require('@vuepress/shared-utils')
const prepare = require('../core/lib/prepare')

module.exports = async ({ extension, sourceDir, siteOptions }) => {
  if (extension === 'pdf') {
    await exportPDF(sourceDir, siteOptions)
  } else {
    logger.warn(`Not support ${extension} format site export!`)
  }
}

async function exportPDF (sourceDir, siteOptions = {}) {
  if (!siteOptions.siteData) {
    logger.error('no such options:siteOptions')
    return
  }
  siteOptions = await prepare(sourceDir)
  const paths = siteOptions.siteData.pages.map(s => s.path)
  const pdfTempDir = path.resolve('./_tempPDF')
  if (!fs.pathExistsSync(pdfTempDir)) {
    fs.mkdir(pdfTempDir)
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const options = paths.map(path => {
    return {
      location: `http://localhost:8080${path}`,
      path: `${pdfTempDir}/${path.replace(/\//g, '-').replace('-', '').replace(/\.html/, '').replace(/-$/, '')}.pdf`
    }
  })
  const files = options.map(option => path.resolve(option.path))
  await downloadPDFs(page, options)
  await mergePDF(files, siteOptions.siteConfig.dest)
  await browser.close()
  fs.removeSync(pdfTempDir)
}

async function downloadPDFs (page, options) {
  try {
    for (let i = 0; i < options.length; i++) {
      const { location, path } = options[i]
      await page.goto(location)
      await page.pdf({ path, format: 'A4' })
      console.log(`pdf ${path} generator success`)
    }
  } catch (e) {
    console.log(e)
  }
}

function mergePDF (files, exportFile = 'site') {
  return new Promise((resolve, reject) => {
    PDFMerge(files, `./${exportFile}.pdf`, (err) => {
      if (err) {
        reject(err)
      }
      console.log(`export ${exportFile} pdf file success!`)
      resolve()
    })
  })
}
