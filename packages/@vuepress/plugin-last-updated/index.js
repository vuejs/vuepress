const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    const { transformer } = options
    const timestamp = getGitLastUpdatedTimeStamp($page._filePath)
    if (timestamp) {
      const lastUpdated = typeof transformer === 'function' ? transformer(timestamp) : timestamp
      $page.lastUpdated = lastUpdated
    }
  }
})

function getGitLastUpdatedTimeStamp (filePath) {
  let lastUpdated
  try {
    lastUpdated = parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filePath]).stdout.toString('utf-8')) * 1000
  } catch (e) { /* do not handle for now */ }
  return lastUpdated
}
