import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import { Docsearch } from './components/Docsearch'
import type { DocsearchOptions } from '../shared'

declare const __DOCSEARCH_OPTIONS__: DocsearchOptions

const options = __DOCSEARCH_OPTIONS__

export default defineClientAppEnhance(({ app }) => {
  // wrap the `<Docsearch />` component with plugin options
  app.component('Docsearch', () => h(Docsearch, { options }))
})
