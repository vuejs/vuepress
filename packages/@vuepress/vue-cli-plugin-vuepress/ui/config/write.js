const { shouldDownloadTheme, downloadTheme } = require('./downloadTheme')

module.exports = mainAPI => async ({ api, prompts }) => {
  const result = {}

  result['themeConfig.nav'] = []

  for (const prompt of prompts) {
    if (!prompt.error && prompt.valueChanged) {
      result[prompt.id] = await api.getAnswer(prompt.id, prompt.raw.transform)

      if (shouldDownloadTheme(prompt, result)) {
        await downloadTheme(result[prompt.id], mainAPI)
      }
    }
  }

  api.setData('config', result)
}
