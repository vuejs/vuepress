const puppeteer = require('puppeteer')
const PDFMerge = require('easy-pdf-merge')
const logger = require('./util/logger')
const path = require('path')
const fs = require('fs-extra')

module.exports = async (extension, sourceDir, port) => {
  if (extension === 'pdf') {
    await exportPDF(sourceDir, port)
  }
}

async function exportPDF (sourceDir, port) {
  const prepare = require('./prepare')
  const siteOptions = await prepare(sourceDir)
  const paths = siteOptions.siteData.pages.map(s => s.path)
  const pdfTempDir = path.resolve('./_tempPDF')
  if (!fs.pathExistsSync(pdfTempDir)) {
    fs.mkdir(pdfTempDir)
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const options = paths.map(path => {
    return {
      // location: `http://localhost:${port}${path}`,
      location: `http://localhost:${port}${path}`,
      path: `${pdfTempDir}/${path.replace(/\//g, '-').replace('-', '').replace(/\.html/, '').replace(/-$/, '')}.pdf`
    }
  })
  const files = options.map(option => path.resolve(option.path))

  try {
    await downloadPDFs(page, options)
    await mergePDF(files, siteOptions.siteConfig.dest)
  } catch (e) {
    logger.error(e.message)
  }

  await browser.close()
  fs.removeSync(pdfTempDir)
}

async function downloadPDFs (page, options) {
  for (let i = 0; i < options.length; i++) {
    const { location, path } = options[i]
    await page.goto(location, { waitUntil: 'networkidle2' })
    await page.pdf({ path, format: 'A4' })
    logger.success(`${location} pdf generator success`)
  }
}

function mergePDF (files, exportFile = 'site') {
  return new Promise((resolve, reject) => {
    PDFMerge(files, `./${exportFile}.pdf`, (err) => {
      if (err) {
        reject(err)
      }
      logger.success(`export ${exportFile} pdf file success!`)
      resolve()
    })
  })
}
