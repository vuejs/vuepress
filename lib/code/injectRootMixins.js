/* eslint-disable */
import rootMixins from '@app/root-mixins'
function injectRootMixins (options) {
  if (!options.mixins) {
    options.mixins = []
  }
  options.mixins.push(...rootMixins)
}
