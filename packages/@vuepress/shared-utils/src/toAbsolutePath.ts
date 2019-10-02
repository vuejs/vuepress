import path from 'upath'

/**
 * Normalize path request to absolute path.
 */

export = function toAbsolutePath (raw: string, cwd: string = process.cwd()) {
  if (path.isAbsolute(raw)) {
    return raw
  }
  return path.resolve(cwd, raw)
}
