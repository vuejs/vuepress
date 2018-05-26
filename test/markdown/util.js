import fs from 'fs-extra'
import path from 'path'

export function Md () {
  return require('markdown-it')({
    html: true,
    highlight: require('@/markdown/highlight.js')
  })
}

export async function getFragment (name) {
  const target = path.resolve(__dirname, `fragments/${name}.md`)
  const content = await fs.readFile(target, 'utf-8')
  return content
}

