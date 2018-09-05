const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ({ _filePath }) {
    const { transformer } = options
    const timestamp = getGitLastUpdatedTimeStamp(_filePath)
    const lastUpdated = typeof transformer === 'function' ? transformer(timestamp) : timestamp
    return { lastUpdated }
  }
})

function getGitLastUpdatedTimeStamp (filePath) {
  return parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filePath]).stdout.toString('utf-8')) * 1000
}
