'use strict'

/**
 * Module dependencies.
 */

const { fs, path } = require('@vuepress/shared-utils')
const yamlParser = require('js-yaml')
const tomlParser = require('toml')

/**
 * Expose loadConfig.
 */

module.exports = function loadConfig (vuepressDir, bustCache = true) {
  const configPath = path.resolve(vuepressDir, 'config.js')
  const configYmlPath = path.resolve(vuepressDir, 'config.yml')
  const configTomlPath = path.resolve(vuepressDir, 'config.toml')

  if (bustCache) {
    delete require.cache[configPath]
  }

  // resolve siteConfig
  let siteConfig = {}
  if (fs.existsSync(configYmlPath)) {
    siteConfig = Object.assign(siteConfig, parseConfig(configYmlPath))
  }
  if (fs.existsSync(configTomlPath)) {
    siteConfig = Object.assign(siteConfig, parseConfig(configTomlPath))
  }
  if (fs.existsSync(configPath)) {
    siteConfig = Object.assign(siteConfig, require(configPath))
  }

  return siteConfig
}

function parseConfig (file) {
  const content = fs.readFileSync(file, 'utf-8')
  const [extension] = /.\w+$/.exec(file)
  let data

  switch (extension) {
  case '.yml':
  case '.yaml':
    data = yamlParser.safeLoad(content)
    break

  case '.toml':
    data = tomlParser.parse(content)
    // reformat to match config since TOML does not allow different data type
    // https://github.com/toml-lang/toml#array
    const format = []
    if (data.head) {
      Object.keys(data.head).forEach(meta => {
        data.head[meta].forEach(values => {
          format.push([meta, values])
        })
      })
    }
    data.head = format
    break
  }

  return data || {}
}
