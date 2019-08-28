const fs = require('fs-extra')
const fsExistsFallback = function (files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      return file
    }
  }
}

module.exports = {
  fsExistsFallback
}
