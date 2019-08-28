type Provider<T, U> = (arg: T) => U
type Resolver<T, U> = (Provider<T, U> | boolean)[] | Provider<T, U>

export = function tryChain<T, U> (resolvers: Array<Resolver<T, U>>, arg: T): U | void {
  let response: U

  for (let resolver of resolvers) {
    if (!Array.isArray(resolver)) {
      resolver = [resolver, true]
    }
    const [provider, condition] = resolver
    if (!condition) {
      continue
    }
    try {
      response = (<Provider<T, U>>provider)(arg)
      return response
    } catch (e) {
    }
  }
}
