<template>
  <RouterLink v-if="isRouterLink" class="nav-link" :to="link" :exact="isExact">
    <slot />
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="link"
    :rel="linkRel"
    :target="linkTarget"
  >
    <slot />
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useSiteData } from '@vuepress/client'
import { isLinkExternal, isLinkMailto, isLinkTel } from '@vuepress/shared'

export default defineComponent({
  name: 'NavLink',

  props: {
    link: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    rel: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const site = useSiteData()
    const { link, target, rel } = toRefs(props)

    // if the link is a non-http link or not
    const isNonHttp = computed(
      () => isLinkMailto(link.value) || isLinkTel(link.value)
    )
    // if the link is an external http link
    const isExternal = computed(() =>
      isLinkExternal(link.value, site.value.base)
    )
    // resolve the `target` attr
    const linkTarget = computed(() => {
      if (isNonHttp.value) return null
      if (target.value) return target.value
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
        return localeKeys.some((key) => key === link.value)
      }
      return link.value === '/'
    })
    // resolve the `rel` attr
    const linkRel = computed(() => {
      if (isNonHttp.value) return null
      if (rel.value) return rel.value
      if (isBlankTarget.value) return 'noopener noreferrer'
      return null
    })

    return {
      isBlankTarget,
      isExact,
      isRouterLink,
      linkRel,
      linkTarget,
    }
  },
})
</script>
