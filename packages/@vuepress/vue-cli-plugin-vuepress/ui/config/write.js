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

  convertNumberProps(result)

  api.setData('config', result)
}

const NUMBER_PROPERTIES = [
  'port',
  'themeConfig.searchMaxSuggestions'
]

function convertNumberProps (result) {
  NUMBER_PROPERTIES.forEach(prop => {
    result[prop] = Number(result[prop])

    if (isNaN(result[prop])) {
      result[prop] = undefined
    }
  })
}
