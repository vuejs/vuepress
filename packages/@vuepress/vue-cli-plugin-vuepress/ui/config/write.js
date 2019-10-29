const get = require('lodash/get')

module.exports = async ({ api, prompts }) => {
  const result = {}

  result['themeConfig.nav'] = []

  for (const prompt of prompts) {
    if (!prompt.error) {
      result[prompt.id] = await api.getAnswer(prompt.id, prompt.raw.transform)
    }
  }

  if (get(result, 'themeConfig.sidebar')) {
    result['themeConfig.sidebar'] = 'auto'
  }

  api.setData('config', result)
}
