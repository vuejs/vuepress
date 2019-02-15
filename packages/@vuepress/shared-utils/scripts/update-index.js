const path = require('path')
const fs = require('fs-extra')

const source = path.resolve(__dirname, '../src')
const target = path.resolve(source, 'index.ts')

const modules = fs.readdirSync(source)
  .filter(v => v !== 'index.ts')
  .map(v => v.slice(0, v.indexOf('.')))

const getImport = (n, p) => `import * as ${n} from '${p}'`

const EXPORTED_MODULES = [
  'chalk',
  'fs',
  'path',
  'globby',
  ['hash-sum', 'hash']
]

const code
  = [
    ...modules.map(v => getImport(v, `./${v}`)),
    ...EXPORTED_MODULES.map(v => Array.isArray(v) ? getImport(v[1], v[0]) : getImport(v, v))
  ].join('\n')
  + `\n\nexport {\n`
  + [
    ...modules,
    ...EXPORTED_MODULES.map(v => Array.isArray(v) ? v[1] : v)
  ].map(v => `  ${v},`).join('\n')
  + '\n}'

fs.writeFileSync(target, code, 'utf-8')

console.log('[Success] Update entry file!')
