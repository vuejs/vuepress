<template>
  <RawOutboundLink>
    <span class="sr-only">{{ $themeLocale.openInNewWindow }}</span>
  </RawOutboundLink>
</template>

<script>
import { defineComponent } from 'vue'
import { OutboundLink } from '@vuepress/client'

/**
 * Override the built-in `<OutboundLink>` for a11y
 */
export default defineComponent({
  name: 'OutboundLink',

  components: {
    RawOutboundLink: OutboundLink,
  },
})
</script>
