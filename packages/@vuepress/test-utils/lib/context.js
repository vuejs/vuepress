const { path: { join }} = require('@vuepress/shared-utils')
const prepare = require('@vuepress/core/lib/prepare')

const DEFAULT_DOCS_DIR = join(__dirname, '../fixtures/docs')

async function createContext (docsDir = DEFAULT_DOCS_DIR, isProd = false) {
  return prepare(docsDir, {}, isProd)
}

let context

async function getContextSingleton (docsDir = DEFAULT_DOCS_DIR, isProd = false) {
  if (!context) {
    context = await prepare(docsDir, {}, isProd)
  }
  return context
}

module.exports = {
  createContext,
  getContextSingleton
}
