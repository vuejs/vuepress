import type * as Config from 'webpack-chain'

/**
 * Set webpack node config
 */
export const handleNode = ({ config }: { config: Config }): void => {
  // do not polyfill or mock node globals and modules
  config.node.merge({
    __filename: false,
    __dirname: false,
    global: false,
  })
}
