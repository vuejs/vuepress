module.exports = function tryChain (resolvers, arg) {
  let response

  for (let resolver of resolvers) {
    if (!Array.isArray(resolver)) {
      resolver = [resolver, true]
    }
    const [provider, condition] = resolver
    if (!condition) {
      continue
    }
    try {
      response = provider(arg)
      return response
    } catch (e) {}
  }
}
