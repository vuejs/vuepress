import { compose } from './compose'
import { parseHeader } from './parseHeader'
import { filterHtmlBlocks } from './filterHtmlBlocks'

/**
 * Parse header and filter the HTML blocks, for where we do not need
 * vue components in headers
 */
export const parseHeaderDeeply = compose(filterHtmlBlocks, parseHeader)
