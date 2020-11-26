export const resolveRoutePathFromUrl = (url: string, base = '/'): string =>
  url
    // remove url origin
    .replace(/^(https?:)?\/\/[^/]*/, '')
    // remove site base
    .replace(new RegExp(`^${base}`), '/')
