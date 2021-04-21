# Webpack

## configureWebpack

- 类型： `(config: WebpackConfiguration, isServer: boolean, isBuild: boolean) => WebpackConfiguration`

- 详情：

  用于修改内部的 Webpack 配置。

  该配置项接收一个函数，该函数的第一个参数是 Webpack 配置对象，第二个参数是 `isServer` 标志位，第三个参数是 `isBuild` 标志位。

## chainWebpack

- 类型： `(config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void`

- 详情：

  通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 来修改内部的 Webpack 配置。

  该配置项接收一个函数，该函数的第一个参数是由 `webpack-chain` 提供的 `Config` 实例，第二个参数是 `isServer` 标志位，第三个参数是 `isBuild` 标志位。

## beforeDevServer

- 类型： `(expressApp: Application, server: WebpackDevServer) => void`

- 详情：

  在 Webpack 的 `devServer.before` 中调用的 Hook 。

  函数的参数是 `devServer.before` 的前两个参数。

- 参考：
  - [Webpack > Configuration > DevServer > devServer.before](https://webpack.js.org/configuration/dev-server/#devserverbefore)

## afterDevServer

- 类型： `(expressApp: Application, server: WebpackDevServer) => void`

- 详情：

  在 Webpack 的 `devServer.after` 中调用的 Hook 。

  函数的参数是 `devServer.after` 的前两个参数。

- 参考：
  - [Webpack > Configuration > DevServer > devServer.after](https://webpack.js.org/configuration/dev-server/#devserverafter)

## postcss

- 类型： `PostcssLoaderOptions`

- 详情：

  `postcss-loader` 的配置项。

- 参考：
  - [postcss-loader > Options](https://github.com/webpack-contrib/postcss-loader#options)

## stylus

- 类型： `StylusLoaderOptions`

- 详情：

  `stylus-loader` 的配置项。

- 参考：
  - [stylus-loader > Options](https://github.com/webpack-contrib/stylus-loader#options)

## scss

- 类型： `SassLoaderOptions`

- 详情：

  针对 `.scss` 文件的 `sass-loader` 的配置项。

- 参考：
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

## sass

- 类型： `SassLoaderOptions`

- 详情：

  针对 `.sass` 文件的 `sass-loader` 的配置项。

- 参考：
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

## less

- 类型： `LessLoaderOptions`

- 详情：

  `less-loader` 的配置项。

- 参考：
  - [less-loader > Options](https://github.com/webpack-contrib/less-loader#options)

### evergreen

- 类型： `boolean`

- 默认值： `true`

- 详情：

  如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 `true` 。这将会禁用一些转译过程和 Polyfills ，带来更快的构建速度和更小的文件体积。
