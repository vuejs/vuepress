import type { OutputAsset, OutputChunk, RollupOutput } from 'rollup'
import { build } from 'vite'
import type { CreateVueAppFunction } from '@vuepress/client'
import type { App, Bundler } from '@vuepress/core'
import { chalk, fs, ora, withSpinner } from '@vuepress/utils'
import type { ViteBundlerOptions } from '../types'
import { renderPage } from './renderPage'
import { resolveViteConfig } from './resolveViteConfig'

export const createBuild = (
  options: ViteBundlerOptions
): Bundler['build'] => async (app: App) => {
  // vite compile
  let clientOutput!: RollupOutput
  let serverOutput!: RollupOutput
  await withSpinner('Compiling with vite')(async () => {
    // create webpack config
    const clientConfig = resolveViteConfig({
      app,
      options,
      isServer: false,
    })
    const serverConfig = resolveViteConfig({
      app,
      options,
      isServer: true,
    })

    ;[clientOutput, serverOutput] = await Promise.all([
      build(clientConfig) as Promise<RollupOutput>,
      build(serverConfig) as Promise<RollupOutput>,
    ])
  })

  // render pages
  await withSpinner('Rendering pages')(async () => {
    // load ssr template file
    const ssrTemplate = (await fs.readFile(app.options.templateSSR)).toString()

    // get client bundle entry chunk and css asset
    const clientEntryChunk = clientOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry
    ) as OutputChunk
    const clientCssAsset = clientOutput.output.find(
      (item) => item.type === 'asset' && item.fileName.endsWith('.css')
    ) as OutputAsset

    // get server bundle entry chunk
    const serverEntryChunk = serverOutput.output.find(
      (item) => item.type === 'chunk' && item.isEntry
    ) as OutputChunk

    // load the compiled server bundle
    const { createVueApp } = require(app.dir.dest(
      '.server',
      serverEntryChunk.fileName
    )) as {
      createVueApp: CreateVueAppFunction
    }

    // create vue ssr app
    const { app: vueApp, router: vueRouter } = await createVueApp()

    // pre-render pages to html files
    const spinner = ora()
    for (const page of app.pages) {
      spinner.start(`Rendering pages ${chalk.magenta(page.path)}`)
      await renderPage({
        app,
        page,
        vueApp,
        vueRouter,
        ssrTemplate,
        output: clientOutput.output,
        outputEntryChunk: clientEntryChunk,
        outputCssAsset: clientCssAsset,
      })
    }
    spinner.stop()
  })

  // keep the server bundle files in debug mode
  if (!app.env.isDebug) {
    // remove server dest directory after pages rendered
    await fs.remove(app.dir.dest('.server'))
  }
}
