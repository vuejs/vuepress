/**
 * Determine a link is a tel: address or not
 */
export const isLinkTel = (link: string): boolean => /^tel:/.test(link)
