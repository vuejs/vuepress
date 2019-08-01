<template>
  <router-link
    class="nav-link"
    :to="link"
    @focusout.native="focusoutAction"
    v-if="!isExternal(link)"
    :exact="exact"
  >{{ item.text }}</router-link>
  <a
    v-else
    :href="link"
    @focusout="focusoutAction"
    class="nav-link external"
    :target="target"
    :rel="rel"
  >
    {{ item.text }}
    <OutboundLink v-if="isTargetBlank"/>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../util'

export default {
  props: {
    item: {
      required: true
    }
  },

  computed: {
    link () {
      return ensureExt(this.item.link)
    },

    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }
      return this.link === '/'
    },

    target () {
      return isMailto(this.link) || isTel(this.link) ? null : this.item.target || '_blank'
    },

    isTargetBlank () {
      return this.target === '_blank'
    },

    rel () {
      return isMailto(this.link) || isTel(this.link) ? null : this.item.rel || 'noopener noreferrer'
    }
  },

  methods: {
    isExternal,
    isMailto,
    isTel,
    focusoutAction () {
      this.$emit('focusout')
    }
  }
}
</script>
