import { createApp, resolvePageFile } from '@vuepress/core'
import type { PageOptions } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

const dirSource = path.resolve(__dirname, '../__fixtures__')
const app = createApp({
  dirSource,
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
      filePath: path.join(dirSource, 'foo.md'),
      filePathRelative: 'foo.md',
      fileContent: fs.readFileSync(path.join(dirSource, 'foo.md')).toString(),
    },
  ],
  [
    {
      // absolute file path
      filePath: path.join(dirSource, 'foo.md'),
    },
    {
      filePath: path.join(dirSource, 'foo.md'),
      filePathRelative: 'foo.md',
      fileContent: fs.readFileSync(path.join(dirSource, 'foo.md')).toString(),
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
