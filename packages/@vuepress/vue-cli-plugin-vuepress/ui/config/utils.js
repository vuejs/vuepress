const loadJsonFile = require('load-json-file')
const get = require('lodash/get')

/* Parse field inputs */

const getJSONObj = (data, prop) => {
  const obj = get(data, prop)
  return JSON.stringify(obj, null, 4)
}

/* Check themes */

const isDefaultTheme = answer => answer.theme === null
const isBlogTheme = answer => answer.theme === '@vuepress/blog'

/* Miscellaneous */

const getPackageJson = async () => {
  try {
    return loadJsonFile('package.json')
  } catch (err) {
    return undefined
  }
}

module.exports = {
  getJSONObj,
  isDefaultTheme,
  isBlogTheme,
  getPackageJson
}
