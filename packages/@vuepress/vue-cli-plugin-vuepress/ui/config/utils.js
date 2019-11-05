const get = require('lodash/get')

const getJSONObj = (data, prop) => {
  const obj = get(data, prop)
  return JSON.stringify(obj, null, 4)
}

const isDefaultTheme = answer => answer.theme === null

const isBlogTheme = answer => answer.theme === '@vuepress/blog'

module.exports = {
  getJSONObj,
  isDefaultTheme,
  isBlogTheme
}
