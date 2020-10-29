import { dedupeHead } from '@vuepress/shared'
import type { HeadConfig } from '@vuepress/shared'

describe('shared > dedupeHead', () => {
  it('should dedupe head correctly', () => {
    const head: HeadConfig[] = [
      // 1
      ['title', {}, 'foo'],
      ['title', {}, 'bar'],
      // 1
      ['base', { href: 'foo' }],
      ['base', { href: 'bar' }],
      // 2
      ['meta', { name: 'foo', content: 'foo' }],
      ['meta', { name: 'foo', content: 'bar' }],
      ['meta', { name: 'bar', content: 'bar' }],
      // 2
      ['template', { id: 'foo' }, 'foo'],
      ['template', { id: 'foo' }, 'bar'],
      ['template', { id: 'bar' }, 'bar'],
      // 3
      ['script', { src: 'foo' }],
      ['script', { src: 'foo' }],
      ['script', { src: 'bar' }],
      ['script', { src: 'bar', async: true }],
      // 2
      ['noscript', {}, 'foo'],
      ['noscript', {}, 'foo'],
      ['noscript', {}, 'bar'],
      // 3
      ['link', { rel: 'icon', href: 'foo.ico' }],
      ['link', { rel: 'icon', href: 'foo.ico' }],
      ['link', { rel: 'stylesheet', href: 'foo.css' }],
      ['link', { rel: 'canonical', href: 'foo' }],
      // 2
      ['style', { type: 'text/css' }, 'body { color: red; }'],
      ['style', { type: 'text/css' }, 'body { color: red; }'],
      ['style', { type: 'text/css' }, 'body { color: white; }'],
    ]

    const dedupedHead = [
      // 1
      ['title', {}, 'foo'],
      // 1
      ['base', { href: 'foo' }],
      // 2
      ['meta', { name: 'foo', content: 'foo' }],
      ['meta', { name: 'bar', content: 'bar' }],
      // 2
      ['template', { id: 'foo' }, 'foo'],
      ['template', { id: 'bar' }, 'bar'],
      // 3
      ['script', { src: 'foo' }],
      ['script', { src: 'bar' }],
      ['script', { src: 'bar', async: true }],
      // 2
      ['noscript', {}, 'foo'],
      ['noscript', {}, 'bar'],
      // 3
      ['link', { rel: 'icon', href: 'foo.ico' }],
      ['link', { rel: 'stylesheet', href: 'foo.css' }],
      ['link', { rel: 'canonical', href: 'foo' }],
      // 2
      ['style', { type: 'text/css' }, 'body { color: red; }'],
      ['style', { type: 'text/css' }, 'body { color: white; }'],
    ]

    expect(dedupeHead(head)).toEqual(dedupedHead)
  })
})
