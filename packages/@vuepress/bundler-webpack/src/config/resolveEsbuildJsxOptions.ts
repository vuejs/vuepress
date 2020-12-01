export interface EsbuildJsxOptions {
  jsxFactory?: string
  jsxFragment?: string
}

export const resolveEsbuildJsxOptions = (): EsbuildJsxOptions => ({
  jsxFactory: 'jsx',
  jsxFragment: 'Fragment',
})
