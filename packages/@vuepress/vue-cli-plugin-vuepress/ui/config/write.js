const get = require('lodash/get')

module.exports = async ({ api, prompts }) => {
  const result = {}

  result['themeConfig.nav'] = []

  for (const prompt of prompts) {
    result[prompt.id] = await api.getAnswer(prompt.id)
  }

  if (get(result, 'themeConfig.sidebar')) {
    result['themeConfig.sidebar'] = 'auto'
  }

  api.setData('config', result)
}
