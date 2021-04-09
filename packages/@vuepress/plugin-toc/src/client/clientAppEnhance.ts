import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import type { TocPropsOptions } from '../shared'
import { Toc } from './components/Toc'

declare const TOC_COMPONENT_NAME: string
declare const TOC_DEFAULT_PROPS_OPTIONS: TocPropsOptions

export default defineClientAppEnhance(({ app }) => {
  // wrap the component with default options
  app.component(TOC_COMPONENT_NAME, (props) =>
    h(Toc, {
      headers: props.headers,
      options: {
        ...TOC_DEFAULT_PROPS_OPTIONS,
        ...props.options,
      },
    })
  )
})
