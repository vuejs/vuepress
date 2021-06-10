import { transformSync } from 'esbuild'
import { fs } from '@vuepress/utils'

/**
 * Transform a ts file to cjs code
 */
export const transformTsFileToCodeSync = (filename: string): string =>
  transformSync(fs.readFileSync(filename).toString(), {
    loader: 'ts',
    format: 'cjs',
    target: 'node12',
  }).code
