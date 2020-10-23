/**
 * Determine a link is a mailto: address or not
 */
export const isLinkMailto = (link: string): boolean => /^mailto:/.test(link)
