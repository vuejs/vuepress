# Webpack

## configureWebpack

- Type: `(config: WebpackConfiguration, isServer: boolean, isBuild: boolean) => WebpackConfiguration`

- Details:

  Edit the internal webpack config.
  
  This option accepts a function that will receive a webpack config object as the 1st argument, an `isServer` flag as the 2nd argument and an `isBuild` flag as the 3rd argument. You can either mutate the config directly, or return an object to be merged by [webpack-merge](https://github.com/survivejs/webpack-merge).

## chainWebpack

- Type: `(config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void`

- Details:

  Edit the internal webpack config with [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

  This option accepts a function that will receive a `Config` instance that provided by `webpack-chain` as the 1st argument an `isServer` flag as the 2nd argument and an `isBuild` flag as the 3rd argument.

## beforeDevServer

- Type: `(expressApp: Application, server: WebpackDevServer) => void`

- Details:

  A hook to be called in `devServer.before` of webpack.

  The arguments of the function are the first two arguments of `devServer.before`.

- Also see:
  - [Webpack > Configuration > DevServer > devServer.before](https://webpack.js.org/configuration/dev-server/#devserverbefore)

## afterDevServer

- Type: `(expressApp: Application, server: WebpackDevServer) => void`

- Details:

  A hook to be called in `devServer.after` of webpack.

  The arguments of the function are the first two arguments of `devServer.after`.

- Also see:
  - [Webpack > Configuration > DevServer > devServer.after](https://webpack.js.org/configuration/dev-server/#devserverafter)

## postcss

- Type: `PostcssLoaderOptions`

- Details:

  Options for `postcss-loader`.

- Also see:
  - [postcss-loader > Options](https://github.com/webpack-contrib/postcss-loader#options)

## stylus

- Type: `StylusLoaderOptions`

- Details:

  Options for `stylus-loader`.

- Also see:
  - [stylus-loader > Options](https://github.com/webpack-contrib/stylus-loader#options)

## scss

- Type: `SassLoaderOptions`

- Details:

  Options for `sass-loader` for `.scss` files.

- Also see:
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

## sass

- Type: `SassLoaderOptions`

- Details:

  Options for `sass-loader` for `.sass` files.

- Also see:
  - [sass-loader > Options](https://github.com/webpack-contrib/sass-loader#options)

## less

- Type: `LessLoaderOptions`

- Details:

  Options for `less-loader`.

- Also see:
  - [less-loader > Options](https://github.com/webpack-contrib/less-loader#options)

### evergreen

- Type: `boolean`

- Default: `true`

- Details:

  Set to `true` if you are only targeting evergreen browsers. This will disable some transpilation and polyfills, and result in faster builds and smaller files.
