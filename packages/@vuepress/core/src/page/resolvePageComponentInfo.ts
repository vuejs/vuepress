import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
} from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import type { App } from '../types'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = async ({
  app,
  content,
  filePathRelative,
  path: routePath,
  key,
}: {
  app: App
  content: string
  filePathRelative: string | null
  path: string
  key: string
}): Promise<{
  headers: MarkdownHeader[]
  links: MarkdownLink[]
  componentFilePath: string
  componentFilePathRelative: string
  componentFileContent: string
  componentFileChunkName: string
}> => {
  const markdownEnv: MarkdownEnv = {
    base: app.options.base,
    filePathRelative,
  }

  const rendered = app.markdown.render(content, markdownEnv)
  const { headers = [], links = [], hoistedTags = [] } = markdownEnv

  // TODO: links check

  // resolve component file content
  // take the rendered markdown content as <template>
  // hoist <script>, <style> and other custom blocks
  const componentFileContent = [
    `<template>${rendered}</template>`,
    ...hoistedTags,
  ].join('\n\n')

  // resolve component file path
  const componentFilePathRelative = path.join(
    'pages',
    filePathRelative?.replace(/\.md$/, '.vue') ?? `${routePath || key}.vue`
  )
  const componentFilePath = app.dir.temp(componentFilePathRelative)
  const componentFileChunkName = key

  return {
    headers,
    links,
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
    componentFileChunkName,
  }
}
