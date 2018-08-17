const isDebug = process.argv.indexOf('--debug') !== -1
const isProd = process.env.NODE_ENV === 'production'

exports.isDebug = isDebug
exports.isProd = isProd
