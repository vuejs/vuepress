const fs = require('fs')

exports.extractHeaders = (file, include = []) => {
  const md = require('./markdown')({})
  const S = require('string')
  const content = fs.readFileSync(file, 'utf-8')
  const tokens = md.parse(content)

  const res = []
  tokens.forEach((t, i) => {
    if (t.type === 'heading_open' && include.includes(t.tag)) {
      const title = tokens[i + 1].content
      res.push({
        title,
        slug: S(title).slugify()
      })
    }
  })
  return res
}
