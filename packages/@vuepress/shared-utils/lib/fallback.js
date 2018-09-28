const fs = require('fs-extra')

exports.fsExistsFallback = function (files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      return file
    }
  }
}
