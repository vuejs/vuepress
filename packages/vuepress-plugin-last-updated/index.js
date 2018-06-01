const path = require('path')
const spawn = require('cross-spawn')

module.exports = options => ({
  client: path.resolve(__dirname, 'client.js'),
  extendPageData ({ filepath }) {
    return {
      lastUpdated: getGitLastUpdatedTimeStamp(filepath)
    }
  }
})

function getGitLastUpdatedTimeStamp (filepath) {
  return parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filepath]).stdout.toString('utf-8')) * 1000
}
