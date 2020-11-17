import * as container from 'markdown-it-container'
import type { Plugin, PluginObject } from '@vuepress/core'
import { chalk, logger } from '@vuepress/utils'
import { ensureLeadingSlash, resolveLocalePath } from '@vuepress/shared'
import type { ContainerPluginOptions, RenderPlaceFunction } from './types'

const containerPlugin: Plugin<ContainerPluginOptions> = ({
  // plugin options
  type,
  after,
  before,
  locales,

  // raw options for markdown-it-container
  validate,
  marker,
  render,
}) => {
  const pluginObj: PluginObject = {
    name: '@vuepress/plugin-container',
    multiple: true,
  }

  // `type` option is required
  if (!type) {
    logger.warn(
      `[${pluginObj.name}] ${chalk.magenta('type')} option is required`
    )
    return pluginObj
  }

  // if `render` option is not specified
  // use `before` and `after` to generate render function
  if (!render) {
    let renderBefore: RenderPlaceFunction
    let renderAfter: RenderPlaceFunction

    if (before !== undefined && after !== undefined) {
      // user defined
      renderBefore = before
      renderAfter = after
    } else {
      // fallback
      renderBefore = (info: string): string =>
        `<div class="custom-block ${type}">${
          info ? `<p class="custom-block-title">${info}</p>` : ''
        }\n`
      renderAfter = (): string => '</div>\n'
    }

    // token info stack
    const infoStack: string[] = []

    render = (tokens, index, opts, env): string => {
      const token = tokens[index]

      if (token.nesting === 1) {
        // `before` tag

        // resolve info (title)
        let info = token.info.trim().slice(type.length).trim()

        if (!info && locales) {
          // locale
          const { filePathRelative } = env
          const relativePath = ensureLeadingSlash(filePathRelative ?? '')

          const localePath = resolveLocalePath(locales, relativePath)
          const localeData = locales[localePath] ?? {}

          if (localeData.defaultInfo) {
            info = localeData.defaultInfo
          } else {
            info = type.toUpperCase()
          }
        }

        // push the info to stack
        infoStack.push(info)

        // render
        return renderBefore(info)
      } else {
        // `after` tag

        // pop the info from stack
        const info = infoStack.pop() || ''

        // render
        return renderAfter(info)
      }
    }
  }

  // use markdown-it-container
  pluginObj.extendsMarkdown = (md) => {
    md.use(container, type, { render, validate, marker })
  }

  return pluginObj
}

export = containerPlugin
