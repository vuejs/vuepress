const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    const { transformer } = options
    const timestamp = getGitLastUpdatedTimeStamp($page._filePath)
    const lastUpdated = typeof transformer === 'function' ? transformer(timestamp) : timestamp
    $page.lastUpdated = lastUpdated
  }
})

function getGitLastUpdatedTimeStamp (filePath) {
  return parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filePath]).stdout.toString('utf-8')) * 1000
}
