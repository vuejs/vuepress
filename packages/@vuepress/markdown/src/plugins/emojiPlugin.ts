import type { PluginWithOptions } from 'markdown-it'
import * as rawEmojiPlugin from 'markdown-it-emoji'

/**
 * Options for markdown-it-emoji
 *
 * @see https://github.com/markdown-it/markdown-it-emoji
 */
export interface EmojiPluginOptions {
  /**
   * rewrite available emoji definitions
   *
   * @example `{ name1: char1, name2: char2, ... }`
   */
  defs?: Record<string, string>

  /**
   * disable all emojis except whitelisted
   */
  enabled?: string[]

  /**
   * rewrite default shortcuts
   *
   * @example `{ "smile": [ ":)", ":-)" ], "laughing": ":D" }`
   */
  shortcuts?: Record<string, string | string[]>
}

export const emojiPlugin: PluginWithOptions<EmojiPluginOptions> = rawEmojiPlugin
