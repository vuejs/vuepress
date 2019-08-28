export = function ensureEndingSlash (path: string): string {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}
