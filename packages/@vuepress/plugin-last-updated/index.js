const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ({ filepath }) {
    const { transformer } = options
    const timestamp = getGitLastUpdatedTimeStamp(filepath)
    const lastUpdated = typeof transformer === 'function' ? transformer(timestamp) : timestamp
    return { lastUpdated }
  }
})

function getGitLastUpdatedTimeStamp (filepath) {
  return parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filepath]).stdout.toString('utf-8')) * 1000
}
