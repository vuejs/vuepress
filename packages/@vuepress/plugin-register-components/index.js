const { fs, path, globby, datatypes: { isString }} = require('@vuepress/shared-utils')

function fileToComponentName (file) {
  return file.replace(/\/|\\/g, '-')
}

async function resolveComponents (componentDir) {
  if (!fs.existsSync(componentDir)) {
    return
  }
  return (await globby(['**/*.vue'], { cwd: componentDir })).map(file => file.slice(0, -4))
}

// Since this plugin can ben used by multiple times, we need to
// give each generated files a uid or the previous file would be
// overwritten.
let moduleId = 0

module.exports = (options, context) => ({
  multiple: true,

  async enhanceAppFiles () {
    const { componentsDir = [], components = [], getComponentName = fileToComponentName } = options
    const baseDirs = Array.isArray(componentsDir) ? componentsDir : [componentsDir]

    function importCode (name, absolutePath) {
      return `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
    }

    function genImport (baseDir, file) {
      const name = getComponentName(file)
      const absolutePath = path.resolve(baseDir, file)
      const code = importCode(name, absolutePath)
      return code
    }

    let code = ''

    // 1. Register components in specified directories
    for (const baseDir of baseDirs) {
      if (!isString(baseDir)) {
        continue
      }
      const files = await resolveComponents(baseDir) || []
      code += files.map(file => genImport(baseDir, file)).join('\n') + '\n'
    }

    // 2. Register named components.
    code += components.map(({ name, path: absolutePath }) => importCode(name, absolutePath))

    code = `import Vue from 'vue'\n` + code + '\n'

    return [
      {
        name: `global-components-${++moduleId}.js`,
        content: code
      }
    ]
  }
})
