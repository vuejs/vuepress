import * as emojiData from 'markdown-it-emoji/lib/data/full.json'

export const parseEmoji = (str: string): string =>
  str.replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
