import { path } from '@vuepress/utils'
import type { App } from '../types'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = async ({
  app,
  renderedContent,
  hoistedTags,
  htmlFilePathRelative,
  key,
}: {
  app: App
  renderedContent: string
  hoistedTags: string[]
  htmlFilePathRelative: string
  key: string
}): Promise<{
  componentFilePath: string
  componentFilePathRelative: string
  componentFileContent: string
  componentFileChunkName: string
}> => {
  // resolve component file content
  // take the rendered markdown content as <template>
  // hoist `<script>`, `<style>` and other custom blocks
  const componentFileContent = [
    `<template>${renderedContent}</template>`,
    ...hoistedTags,
  ].join('\n\n')

  // resolve component file path
  const componentFilePathRelative = path.join(
    'pages',
    `${htmlFilePathRelative}.vue`
  )
  const componentFilePath = app.dir.temp(componentFilePathRelative)
  const componentFileChunkName = key

  return {
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
    componentFileChunkName,
  }
}
