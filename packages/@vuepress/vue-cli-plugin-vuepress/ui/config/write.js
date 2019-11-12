const { shouldDownloadTheme, downloadTheme } = require('./downloadTheme')

module.exports = mainAPI => async ({ api, prompts }) => {
  const result = {}

  result['themeConfig.nav'] = []

  for (const prompt of prompts) {
    if (!prompt.error) {
      result[prompt.id] = await api.getAnswer(prompt.id, prompt.raw.transform)

      // Check if VuePress theme field has changed
      if (prompt.id === 'theme' && prompt.valueChanged && await shouldDownloadTheme(result.theme)) {
        await downloadTheme(result[prompt.id], mainAPI)
      }
    }
  }

  api.setData('config', result)
}
