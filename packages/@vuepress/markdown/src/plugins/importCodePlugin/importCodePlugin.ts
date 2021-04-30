import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownEnv } from '../../types'
import { createImportCodeBlockRule } from './createImportCodeBlockRule'
import { resolveImportCode } from './resolveImportCode'

export interface ImportCodePluginOptions {
  /**
   * A function to handle the import path
   */
  handleImportPath?: (str: string) => string
}

export const importCodePlugin: PluginWithOptions<ImportCodePluginOptions> = (
  md,
  options = {}
): void => {
  // add import_code block rule
  md.block.ruler.before(
    'fence',
    'import_code',
    createImportCodeBlockRule(options),
    {
      alt: ['paragraph', 'reference', 'blockquote', 'list'],
    }
  )

  // add import_code renderer rule
  md.renderer.rules.import_code = (
    tokens,
    idx,
    options,
    env: MarkdownEnv,
    slf
  ) => {
    const token = tokens[idx]

    // use imported code as token content
    const { importFilePath, importCode } = resolveImportCode(token.meta, env)
    token.content = importCode

    // extract imported files to env
    if (importFilePath) {
      const importedFiles = env.importedFiles || (env.importedFiles = [])
      importedFiles.push(importFilePath)
    }

    // render the import_code token as a fence token
    return md.renderer.rules.fence!(tokens, idx, options, env, slf)
  }
}
