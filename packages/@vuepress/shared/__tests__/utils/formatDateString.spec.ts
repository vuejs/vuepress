import { formatDateString } from '@vuepress/shared'

const testCases = [
  ['2020-1-1', '2020-01-01'],
  ['2020-1-01', '2020-01-01'],
  ['2020-01-1', '2020-01-01'],
  ['2020-01-01', '2020-01-01'],
]

const testCasesFallback = [
  ['202-1-1', '1970-01-01'],
  ['2020-111-1', '1970-01-01'],
  ['2020-01-001', '1970-01-01'],
  ['202-1-1', '0000-00-00'],
  ['2020-111-1', '0000-00-00'],
  ['2020-01-001', '0000-00-00'],
]

describe('shared > formatDateString', () => {
  describe('should format date string correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(formatDateString(source)).toBe(expected)
      })
    })
  })

  describe('should fallback to default date string', () => {
    testCasesFallback.forEach(([source, expected]) => {
      it(source, () => {
        expect(formatDateString(source, expected)).toBe(expected)
      })
    })
  })
})
