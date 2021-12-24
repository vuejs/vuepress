import ChainWebpackConfig from "webpack-chain";

export type ChainWebpack = (config: ChainWebpackConfig, isServer: boolean) => void;

export type Hook<U extends unknown[], R extends unknown> = (...arg: U) => R;

export type AsyncHook<U extends unknown[], R extends unknown> = Hook<
  U,
  Promise<R>
>;

export type PluginObject = Record<string, any>;