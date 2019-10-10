
module.exports = async ({ api, prompts }) => {
  const result = {}
  for (const prompt of prompts) {
    result[`${prompt.id}`] = await api.getAnswer(prompt.id)
  }

  api.setData('config', result)
}
