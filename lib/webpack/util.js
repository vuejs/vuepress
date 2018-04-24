const { readFileSync } = require('fs')
const { resolve, dirname } = require('path')

const mdExplodeIncludes = exports.mdExplodeIncludes = ({ cwd, src }) => {
  const deps = []

  return {
    explodedSrc: src.replace(/<!--\s*include\s+([^\s]+)\s*-->/g, (match, path) => {
      try {
        const absolutePath = resolve(cwd, path)
        const content = readFileSync(absolutePath, 'utf8')

        // recursively explode the included file
        const { explodedSrc, dependencies } = mdExplodeIncludes({
          cwd: dirname(absolutePath),
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
