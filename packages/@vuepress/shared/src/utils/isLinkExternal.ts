/**
 * Determine a link is external or not
 */
export const isLinkExternal = (link: string, base = '/'): boolean => {
  // link with protocol
  // - http://github.com
  // - https://github.com
  // - //github.com
  if (/^(https?:)?\/\//.test(link)) {
    return true
  }

  // absolute link that does not start with `base`
  if (link.startsWith('/') && !link.startsWith(base)) {
    return true
  }

  return false
}
