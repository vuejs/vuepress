import type {
  MarkdownEnv,
  MarkdownHeader,
  MarkdownLink,
} from '@vuepress/markdown'
import { path } from '@vuepress/utils'
import type { App, PageFrontmatter } from '../types'

/**
 * Resolve page component and related info
 */
export const resolvePageComponentInfo = async ({
  app,
  content,
  frontmatter,
  filePathRelative,
  htmlFilePathRelative,
  key,
}: {
  app: App
  content: string
  frontmatter: PageFrontmatter
  filePathRelative: string | null
  htmlFilePathRelative: string | null
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
    frontmatter,
  }

  const rendered = app.markdown.render(content, markdownEnv)

  /* istanbul ignore next */
  const { headers = [], links = [], hoistedTags = [] } = markdownEnv

  // TODO: links check

  // resolve component file content
  // take the rendered markdown content as <template>
  // hoist `<script>`, `<style>` and other custom blocks
  const componentFileContent = [
    `<template>${rendered}</template>`,
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
    headers,
    links,
    componentFilePath,
    componentFilePathRelative,
    componentFileContent,
    componentFileChunkName,
  }
}
