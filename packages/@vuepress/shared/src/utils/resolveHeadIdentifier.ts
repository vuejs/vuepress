import type { HeadConfig } from '../types'

/**
 * Resolve identifier of a tag, to avoid duplicated tags in `<head>`
 */
export const resolveHeadIdentifier = ([
  tag,
  attrs,
  content,
]: HeadConfig): string => {
  // avoid duplicated `<meta>` with same `name`
  if (tag === 'meta' && attrs.name) {
    return `${tag}.${attrs.name}`
  }

  // there should be only one `<title>` or `<base>`
  if (['title', 'base'].includes(tag)) {
    return tag
  }

  // avoid duplicated `<template>` with same `id`
  if (tag === 'template' && attrs.id) {
    return `${tag}.${attrs.id}`
  }

  return JSON.stringify([tag, attrs, content])
}
