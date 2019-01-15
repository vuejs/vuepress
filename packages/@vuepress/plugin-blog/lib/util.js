const curryFrontmatterHandler = (scope, map) => (key, pageKey) => {
  if (key) {
    if (!map[key]) {
      map[key] = {}
      map[key].scope = scope
      map[key].path = `/${scope}/${key}/`
      map[key].pageKeys = []
    }
    map[key].pageKeys.push(pageKey)
  }
}

module.exports = {
  curryFrontmatterHandler
}
