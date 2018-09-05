const indexRE = /(^|.*\/)(index|readme)\.md$/i

function isIndexFile (file) {
  return indexRE.test(file)
}

module.exports = isIndexFile
module.exports.indexRE = indexRE
