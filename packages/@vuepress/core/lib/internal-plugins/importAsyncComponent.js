function genImportAsyncComponentFile (pages) {
  return `export function loadComponent (key) {
  switch (key) {
${pages.map(({ key, _filePath }) => `    case "${key}": return import("${_filePath}");`).join('\n')}
  }
}`
}

module.exports = (options, context) => ({
  name: '@vuepress/internal-import-async-component',

  // @internal/async-component
  async clientDynamicModules () {
    const importAsyncComponentCode = genImportAsyncComponentFile(context.pages)
    return {
      name: 'async-component.js',
      content: importAsyncComponentCode,
      dirname: 'internal'
    }
  }
})
