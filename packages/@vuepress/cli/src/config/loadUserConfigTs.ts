import type { build as _build } from 'esbuild'
import { fs, path } from '@vuepress/utils'
import { loadUserConfigJs } from './loadUserConfigJs'
import type { UserConfigLoader } from './types'

/**
 * Load ts config file
 */
export const loadUserConfigTs: UserConfigLoader = async (userConfigPath) => {
  // lazy load esbuild
  const { build } = require('esbuild') as { build: typeof _build }

  // output the build result to a temp file
  const tempFile = path.resolve(__dirname, '../../.temp/config.js')
  await build({
    entryPoints: [userConfigPath],
    outfile: tempFile,
    format: 'cjs',
    platform: 'node',
    target: 'node12',
    bundle: true,
  })

  // load js from temp file
  const result = loadUserConfigJs(tempFile)

  // remove temp file after loaded
  await fs.remove(tempFile)

  return result
}
