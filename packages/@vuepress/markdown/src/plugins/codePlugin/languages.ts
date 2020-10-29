/**
 * Language type for prism syntax highlight
 */
export interface HighlightLanguage {
  /**
   * Name of the language
   *
   * The name to be used for the class name,
   * e.g. `class="language-typescript"`
   *
   * It's also the internal name in prismjs, which
   * will be used for `Prism.loadLanguages()`
   */
  name: string

  /**
   * Extension of the language
   *
   * The file extension, which will be used for the
   * class name, e.g. `class="ext-ts"`
   */
  ext: string

  /**
   * Aliases that point to this language
   *
   * Do not conflict with other languages
   */
  aliases: string[]
}

export const languageBash: HighlightLanguage = {
  name: 'bash',
  ext: 'sh',
  aliases: ['bash', 'sh', 'shell'],
}

export const languageHtml: HighlightLanguage = {
  name: 'markup',
  ext: 'html',
  aliases: ['html'],
}

export const languageJavascript: HighlightLanguage = {
  name: 'javascript',
  ext: 'js',
  aliases: ['javascript', 'js'],
}

export const languageKotlin: HighlightLanguage = {
  name: 'kotlin',
  ext: 'kt',
  aliases: ['kotlin', 'kt'],
}

export const languageMarkdown: HighlightLanguage = {
  name: 'markdown',
  ext: 'md',
  aliases: ['markdown', 'md'],
}

export const languagePython: HighlightLanguage = {
  name: 'python',
  ext: 'py',
  aliases: ['py', 'python'],
}

export const languageRuby: HighlightLanguage = {
  name: 'ruby',
  ext: 'rb',
  aliases: ['rb', 'ruby'],
}

export const languageRust: HighlightLanguage = {
  name: 'rust',
  ext: 'rs',
  aliases: ['rs', 'rust'],
}

export const languageStylus: HighlightLanguage = {
  name: 'stylus',
  ext: 'styl',
  aliases: ['styl', 'stylus'],
}

export const languageTypescript: HighlightLanguage = {
  name: 'typescript',
  ext: 'ts',
  aliases: ['ts', 'typescript'],
}

export const languageVue: HighlightLanguage = {
  name: 'markup',
  ext: 'vue',
  aliases: ['vue'],
}

export const languageYaml: HighlightLanguage = {
  name: 'yaml',
  ext: 'yml',
  aliases: ['yaml', 'yml'],
}
