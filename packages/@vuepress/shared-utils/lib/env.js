const isDebug = process.argv.indexOf('--debug') !== -1
const isProduction = () => process.env.NODE_ENV === 'production'
const isTest = () => process.env.NODE_ENV === 'test'

exports.isDebug = isDebug
exports.isTest = isTest
exports.isProduction = isProduction
