exports.PLUGINS = {
  COMPONENT: 'component',
  HIGHLIGHT_LINES: 'highlight-lines',
  PRE_WRAPPER: 'pre-wrapper',
  SNIPPET: 'snippet',
  CONVERT_ROUTER_LINK: 'convert-router-link',
  HOIST_SCRIPT_STYLE: 'hoist-script-style',
  ANCHOR: 'anchor',
  EMOJI: 'emoji',
  TOC: 'toc',
  LINE_NUMBERS: 'line-numbers'
}

exports.REQUIRED_PLUGINS = [
  exports.PLUGINS.COMPONENT,
  exports.PLUGINS.ANCHOR
]
