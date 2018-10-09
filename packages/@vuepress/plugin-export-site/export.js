const puppeteer = require('puppeteer')
const PDFMerge = require('easy-pdf-merge')
const { path, fs, logger } = require('@vuepress/shared-utils')

module.exports = async ({ extension, sourceDir, pages, dest }) => {
  if (extension === 'pdf') {
    await exportPDF({ sourceDir, pages, dest })
  } else {
    logger.warn(`Not support ${extension} format site export!`)
  }
}

async function exportPDF ({ sourceDir, pages = [], dest }) {
  try {
    const paths = pages.map(s => s.path)
    const pdfTempDir = path.resolve('./_tempPDF')
    fs.ensureDirSync(pdfTempDir)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // port finder
    const options = paths.map(path => {
      return {
        location: `http://localhost:8080${path}`,
        path: `${pdfTempDir}/${path.replace(/\//g, '-').replace('-', '').replace(/\.html/, '').replace(/-$/, '')}.pdf`
      }
    })
    const files = options.map(option => path.resolve(option.path))
    await downloadPDFs(page, options)
    await mergePDF(files, dest)
    await browser.close()
    fs.removeSync(pdfTempDir)
  } catch (e) {
    logger.error(e.stack)
  }
}

async function downloadPDFs (page, options) {
  for (let i = 0; i < options.length; i++) {
    const { location, path } = options[i]
    await page.goto(location, { waitUntil: 'networkidle2' })
    await page.pdf({ path, format: 'A4' })
    logger.success(`pdf ${path} generator success`)
  }
}

function mergePDF (files, exportFile = 'site') {
  return new Promise((resolve, reject) => {
    PDFMerge(files, `${exportFile}.pdf`, (err) => {
      if (err) {
        reject(err)
      }
      logger.success(`export ${exportFile}.pdf file success!`)
      resolve()
    })
  })
}
