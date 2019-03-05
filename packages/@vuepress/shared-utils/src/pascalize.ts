export default function pascalize (source: string) {
  return source.replace(/(^|-)[a-z]/g, s => s.slice(-1).toUpperCase())
}
