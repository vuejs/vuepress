export default function pascalize (source: string) {
  return source.replace(/(^|-)\w/g, s => s.slice(-1).toUpperCase())
}
