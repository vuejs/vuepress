/**
 * postcss-loader does not provide official typings, so we extract types from:
 *
 * @see  https://github.com/webpack-contrib/postcss-loader/tree/v3.0.0
 */
export interface PostCssLoaderOptions {
  /**
   * Postcss plugins
   */
  plugins?: unknown[];
  /**
   * Enables/Disables generation of source maps
   */
  sourceMap?: boolean;
  /**
   * Omit other options
   */
  [key: string]: any;
}
