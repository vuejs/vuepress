import type { WebpackPluginInstance } from 'webpack'
import { fs } from '@vuepress/utils'
import type { StatsToJsonOutput, FnModules } from '../../types.webpack'
import { isCSS, isJS } from './utils'

export interface ClientManifest {
  all: string[]
  initial: string[]
  async: string[]
  modules: Record<string, number[]>
}

/**
 * Vuepress client plugin
 *
 * Collecting webpack bundled files info for SSR
 */
export const createClientPlugin = (
  outputFile: string
): WebpackPluginInstance => {
  const clientPlugin: WebpackPluginInstance = {
    apply(compiler) {
      compiler.hooks.emit.tapPromise(
        'vuepress-client-plugin',
        async (compilation) => {
          // get webpack stats object
          const stats: StatsToJsonOutput = (compilation
            .getStats()
            .toJson() as unknown) as StatsToJsonOutput

          const {
            assets = [],
            modules = [],
            entrypoints = {},
            chunks = [],
          } = stats

          // get all files
          const allFiles = assets.map((a) => a.name)

          // get initial entry files
          const initialFiles = Object.keys(entrypoints)
            .map((name) => entrypoints[name].assets.map((item) => item.name))
            .reduce((assets, all) => all.concat(assets), [])
            .filter((file) => isJS(file) || isCSS(file))

          // get files that should be loaded asynchronously
          // i.e. script and style files that are not included in the initial entry files
          const asyncFiles = allFiles.filter(
            (file) =>
              (isJS(file) || isCSS(file)) && !initialFiles.includes(file)
          )

          // get asset modules
          const assetModules = modules.filter(
            (m): m is FnModules & Required<Pick<FnModules, 'assets'>> =>
              !!(m.assets && m.assets.length)
          )

          // get modules for client manifest
          const manifestModules: ClientManifest['modules'] = {}

          const fileToIndex = (file: string): number => allFiles.indexOf(file)

          modules.forEach((m) => {
            // ignore modules duplicated in multiple chunks
            if (m.chunks.length !== 1) {
              return
            }

            const cid = m.chunks[0]
            const chunk = chunks.find((c) => c.id === cid)

            if (!chunk || !chunk.files) {
              return
            }

            // remove appended hash of module identifier
            // which is the request string of the module
            const request = m.identifier.replace(/\s\w+$/, '')

            // get chunk files index
            const files = [...chunk.files.map(fileToIndex)]

            // find all asset modules associated with the same chunk
            assetModules.forEach((m) => {
              if (m.chunks.some((id) => id === cid)) {
                // get asset files
                files.push(...m.assets.map(fileToIndex))
              }
            })

            // map the module request to files index
            manifestModules[request] = files
          })

          // generate client manifest json file
          const clientManifest: ClientManifest = {
            all: allFiles,
            initial: initialFiles,
            async: asyncFiles,
            modules: manifestModules,
          }

          const clientManifestJson = JSON.stringify(clientManifest, null, 2)

          await fs.outputFile(outputFile, clientManifestJson)
        }
      )
    },
  }

  return clientPlugin
}
