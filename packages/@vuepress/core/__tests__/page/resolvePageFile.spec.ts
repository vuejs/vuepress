import { createApp, resolvePageFile } from '@vuepress/core'
import type { PageOptions } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

const source = path.resolve(__dirname, '../__fixtures__')
const app = createApp({
  source,
})

const testCases: [
  PageOptions,
  ReturnType<typeof resolvePageFile> extends Promise<infer U> ? U : never
][] = [
  [
    {},
    {
      filePath: null,
      filePathRelative: null,
      fileContent: '',
    },
  ],
  [
    {
      // relative file path
      filePath: 'foo.md',
    },
    {
      filePath: path.join(source, 'foo.md'),
      filePathRelative: 'foo.md',
      fileContent: fs.readFileSync(path.join(source, 'foo.md')).toString(),
    },
  ],
  [
    {
      // absolute file path
      filePath: path.join(source, 'foo.md'),
    },
    {
      filePath: path.join(source, 'foo.md'),
      filePathRelative: 'foo.md',
      fileContent: fs.readFileSync(path.join(source, 'foo.md')).toString(),
    },
  ],
]

describe('core > page > resolvePageFile', () => {
  describe('should resolve page file correctly', () => {
    testCases.forEach(([options, expected]) => {
      it(`options: ${JSON.stringify(options)}`, async () => {
        expect(await resolvePageFile(app, options)).toEqual(expected)
      })
    })
  })
})
