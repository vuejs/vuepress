module.exports = async ({ api, prompts }) => {
  const result = {}

  result['themeConfig.nav'] = []

  for (const prompt of prompts) {
    if (!prompt.error && prompt.valueChanged) {
      result[prompt.id] = await api.getAnswer(prompt.id, prompt.raw.transform)
    }
  }

  api.setData('config', result)
}
