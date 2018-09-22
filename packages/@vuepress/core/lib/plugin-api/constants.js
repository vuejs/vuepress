'use strict'

const PLUGIN_OPTION_META_MAP = {
  // hooks
  READY: { name: 'ready', types: [Function] },
  COMPILED: { name: 'compiled', types: [Function] },
  UPDATED: { name: 'updated', types: [Function] },
  GENERATED: { name: 'generated', types: [Function] },
  // options
  CHAIN_WEBPACK: { name: 'chainWebpack', types: [Function] },
  ENHANCE_DEV_SERVER: { name: 'enhanceDevServer', types: [Function] },
  ENHANCE_APP_FILES: { name: 'enhanceAppFiles', types: [Array, Function] },
  OUT_FILES: { name: 'outFiles', types: [Object] },
  EXTEND_PAGE_DATA: { name: 'extendPageData', types: [Function] },
  EXTEND_MARKDOWN: { name: 'extendMarkdown', types: [Function] },
  CLIENT_DYNAMIC_MODULES: { name: 'clientDynamicModules', types: [Function] },
  CLIENT_ROOT_MIXIN: { name: 'clientRootMixin', types: [String] },
  ADDITIONAL_PAGES: { name: 'additionalPages', types: [Function, Array] },
  GLOBAL_UI_COMPONENTS: { name: 'globalUIComponents', types: [String, Array] },
  DEFINE: { name: 'define', types: [Function, Object] }
}

const PLUGIN_OPTION_MAP = {}
Object.keys(PLUGIN_OPTION_META_MAP).forEach(key => {
  PLUGIN_OPTION_MAP[key] = Object.assign({ key }, PLUGIN_OPTION_META_MAP[key])
})

const OPTION_NAMES = Object.keys(PLUGIN_OPTION_META_MAP).map(key => PLUGIN_OPTION_META_MAP[key].name)

exports.PLUGIN_OPTION_MAP = PLUGIN_OPTION_MAP
exports.OPTION_NAMES = OPTION_NAMES
