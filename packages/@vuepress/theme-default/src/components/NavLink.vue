<template>
  <RouterLink
    v-if="isRouterLink"
    class="nav-link"
    :to="item.link"
    :exact="isExact"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    {{ item.text }}
    <slot name="after" />
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="item.link"
    :rel="linkRel"
    :target="linkTarget"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
  >
    <slot name="before" />
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useSiteData } from '@vuepress/client'
import { isLinkExternal, isLinkMailto, isLinkTel } from '@vuepress/shared'
import type { NavLink } from '../types'

export default defineComponent({
  name: 'NavLink',

  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<NavLink>,
      required: true,
    },
  },

  setup(props) {
    const site = useSiteData()
    const { item } = toRefs(props)

    // if the link is a non-http link or not
    const isNonHttp = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    )
    // if the link is an external http link
    const isExternal = computed(() =>
      isLinkExternal(item.value.link, site.value.base)
    )
    // resolve the `target` attr
    const linkTarget = computed(() => {
      if (isNonHttp.value) return null
      if (item.value.target) return item.value.target
      if (isExternal.value) return '_blank'
      return null
    })
    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === '_blank')
    // is `<RouterLink>` or not
    const isRouterLink = computed(
      () => !isExternal.value && !isBlankTarget.value
    )
    // is the `exact` prop of `<RouterLink>` should be true
    const isExact = computed(() => {
      const localeKeys = Object.keys(site.value.locales)
      if (localeKeys.length) {
        return localeKeys.some((key) => key === item.value.link)
      }
      return item.value.link === '/'
    })
    // resolve the `rel` attr
    const linkRel = computed(() => {
      if (isNonHttp.value) return null
      if (item.value.rel) return item.value.rel
      if (isBlankTarget.value) return 'noopener noreferrer'
      return null
    })
    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    )

    return {
      isBlankTarget,
      isExact,
      isRouterLink,
      linkRel,
      linkTarget,
      linkAriaLabel,
    }
  },
})
</script>
