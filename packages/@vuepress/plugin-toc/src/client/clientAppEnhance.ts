import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import type { TocPropsOptions } from '../shared'
import { Toc } from './components/Toc'

declare const __TOC_COMPONENT_NAME__: string
declare const __TOC_DEFAULT_PROPS_OPTIONS__: TocPropsOptions

const defaultPropsOptions = __TOC_DEFAULT_PROPS_OPTIONS__

export default defineClientAppEnhance(({ app }) => {
  // wrap the component with default options
  app.component(__TOC_COMPONENT_NAME__, (props) =>
    h(Toc, {
      headers: props.headers,
      options: {
        ...defaultPropsOptions,
        ...props.options,
      },
    })
  )
})
