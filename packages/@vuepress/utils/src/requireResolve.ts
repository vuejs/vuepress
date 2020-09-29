/**
 * Wrapper of `require.resolve` of nodejs
 *
 * Return `null` if the module cannot be resolved
 * instead of throwing an error
 */
export const requireResolve = (request: string): string | null => {
  try {
    return require.resolve(request)
  } catch {
    return null
  }
}
