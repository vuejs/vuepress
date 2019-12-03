import emojiData from 'markdown-it-emoji/lib/data/full.json'

export default (str: string) => {
  return String(str).replace(/:(.+?):/g, (placeholder, key) => emojiData[key] || placeholder)
}
