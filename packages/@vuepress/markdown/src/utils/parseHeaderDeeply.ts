import { compose } from './compose'
import { parseHeader } from './parseHeader'
import { removeNonCodeWrappedHTML } from './removeNonCodeWrappedHTML'

// Also clean the html blocks that aren't wrapped by code wrapper ``.
// Because we want to support using VUE components in headers.
export const parseHeaderDeeply = compose(removeNonCodeWrappedHTML, parseHeader)
