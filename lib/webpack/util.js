const { readFile } = require('fs-extra')
const { resolve, dirname } = require('path')

const asyncReplace = async (str, regex, aReplacer) => {
  regex = new RegExp(regex, 'g')
  const replacedParts = []
  let match
  let i = 0
  while ((match = regex.exec(str)) !== null) {
    // put non matching string
    replacedParts.push(str.slice(i, match.index))
    // call the async replacer function with the matched array spreaded
    replacedParts.push(aReplacer(...match))
    i = regex.lastIndex
  }

  // put the rest of str
  replacedParts.push(str.slice(i))

  // wait for aReplacer calls to finish and join them back into string
  return (await Promise.all(replacedParts)).join('')
}

const mdExplodeIncludes = exports.mdExplodeIncludes = async ({ dir, src }) => {
  const deps = []

  return {
    explodedSrc: await asyncReplace(src, /<!--\s*include\s+([^\s]+)\s*-->/g, async (match, path) => {
      try {
        const absolutePath = resolve(dir, path)
        const content = await readFile(absolutePath, 'utf8')

        // recursively explode the included file
        const { explodedSrc, dependencies } = await mdExplodeIncludes({
          dir: dirname(absolutePath),
          src: content
        })

        deps.push(absolutePath, ...dependencies)
        return explodedSrc
      } catch (e) {
        return match
      }
    }),
    dependencies: deps
  }
}
