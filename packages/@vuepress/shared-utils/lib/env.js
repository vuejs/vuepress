const isDebug = process.argv.indexOf('--debug') !== -1
const isProduction = () => process.env.NODE_ENV === 'production'

exports.isDebug = isDebug
exports.isProduction = isProduction
