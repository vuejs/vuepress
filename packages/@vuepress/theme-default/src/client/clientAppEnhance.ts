import { defineClientAppEnhance } from '@vuepress/client'
import Badge from './components/global/Badge.vue'
import CodeGroup from './components/global/CodeGroup'
import CodeGroupItem from './components/global/CodeGroupItem.vue'
import OutboundLink from './components/global/OutboundLink.vue'
import { useScrollPromise } from './composables'

import './styles/index.scss'

declare const __DOCSEARCH_PROPS__: unknown

export default defineClientAppEnhance(({ app, router }) => {
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)

  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink
  // override the built-in `<OutboundLink>`
  app.component('OutboundLink', OutboundLink)

  // docsearch feature might not be commonly used, so we don't put it
  // into dependencies of default theme, but it is supported
  if (typeof __DOCSEARCH_PROPS__ === 'undefined') {
    // register a mock `<Docsearch>` if docsearch plugin is not enabled
    app.component('Docsearch', () => null)
  }

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior!
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait()
    return scrollBehavior(...args)
  }
})
