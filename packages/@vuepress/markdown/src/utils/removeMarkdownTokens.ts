export const removeMarkdownTokens = (str: string): string =>
  str
    .replace(/\[(.*)\]\(.*\)/, '$1') // []()
    .replace(/(`|\*{1,3}|_)(.*?[^\\])\1/g, '$2') // `{t}` | *{t}* | **{t}** | ***{t}*** | _{t}_
    .replace(/(\\)(\*|_|`|!)/g, '$2') // remove escape char '\'
