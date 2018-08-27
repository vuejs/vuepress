const AppContext = require('./AppContext')

module.exports = async function prepare (sourceDir, {
  isProd,
  plugins,
  theme,
  temp
}) {
  const appContext = new AppContext(sourceDir, { plugins, theme, isProd, temp })
  await appContext.process()
  return appContext
}
