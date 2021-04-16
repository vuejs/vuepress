import { createAppEnv, createAppOptions } from '@vuepress/core'
import type { AppEnv, AppOptions } from '@vuepress/core'

const source = '/foo'
let appOptions: AppOptions

const testCases: [() => void, AppEnv][] = [
  [
    () => {
      appOptions = createAppOptions({ source })
      process.env.NODE_ENV = 'development'
    },
    {
      isProd: false,
      isTest: false,
      isDev: true,
      isDebug: false,
      nodeEnv: 'development',
    },
  ],
  [
    () => {
      appOptions = createAppOptions({ source, debug: true })
      process.env.NODE_ENV = 'development'
    },
    {
      isProd: false,
      isTest: false,
      isDev: true,
      isDebug: true,
      nodeEnv: 'development',
    },
  ],
  [
    () => {
      appOptions = createAppOptions({ source })
      process.env.NODE_ENV = 'production'
    },
    {
      isProd: true,
      isTest: false,
      isDev: false,
      isDebug: false,
      nodeEnv: 'production',
    },
  ],
  [
    () => {
      appOptions = createAppOptions({ source })
      process.env.NODE_ENV = 'test'
    },
    {
      isProd: false,
      isTest: true,
      isDev: false,
      isDebug: false,
      nodeEnv: 'test',
    },
  ],
  [
    () => {
      appOptions = createAppOptions({ source })
      process.env.NODE_ENV = 'foo'
    },
    {
      isProd: false,
      isTest: false,
      isDev: false,
      isDebug: false,
      nodeEnv: 'foo',
    },
  ],
]

describe('core > app > createAppEnv', () => {
  const savedNodeEnv = process.env.NODE_ENV

  describe('should create app env correctly', () => {
    testCases.forEach(([preHandler, expected], i) => {
      it(`case ${i}`, () => {
        preHandler()
        expect(createAppEnv(appOptions)).toEqual(expected)
      })
    })
  })

  process.env.NODE_ENV = savedNodeEnv
})
