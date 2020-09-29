/**
 * Normalize package name
 */
export const normalizePackageName = (
  request: string,
  org: string,
  type: string | null = null
): string => {
  // org prefix and type prefix
  const orgPrefix = `${org}-`
  const typePrefix = type === null ? '' : `${type}-`

  // scoped package pattern
  const scopedMatch = request.match(/^@(.*)\/(.*)$/)

  // handle non-scoped package
  if (scopedMatch === null) {
    // full name, return as is
    if (request.startsWith(`${orgPrefix}${typePrefix}`)) {
      return request
    }

    // short name, add org prefix and type prefix
    return `${orgPrefix}${typePrefix}${request}`
  }

  // handle scoped package
  const [, reqOrg, reqName] = scopedMatch

  // handle default org
  if (reqOrg === org) {
    // full name, return as is
    if (reqName.startsWith(typePrefix)) {
      return request
    }

    // short name, add type prefix
    return `@${reqOrg}/${typePrefix}${reqName}`
  }

  // handle other org

  // full name, return as is
  if (reqName.startsWith(`${orgPrefix}${typePrefix}`)) {
    return request
  }

  // short name, add org prefix and type prefix
  return `@${reqOrg}/${orgPrefix}${typePrefix}${reqName}`
}
