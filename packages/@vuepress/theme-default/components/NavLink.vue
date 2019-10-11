<template>
  <router-link
    class="nav-link"
    :to="link"
    @focusout.native="focusoutAction"
    v-if="isInternal"
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
      return isMailto(this.link) || isTel(this.link) ? null : this.item.target
      || (isExternal(this.link) ? '_blank' : '')
    },

    isTargetBlank () {
      return this.target === '_blank'
    },

    rel () {
      return isMailto(this.link) || isTel(this.link) ? null : this.item.rel
      || (this.isTargetBlank ? 'noopener noreferrer' : '')
    },

    isInternal () {
      return !isExternal(this.link) && !this.isTargetBlank
    }
  },

  methods: {
    focusoutAction () {
      this.$emit('focusout')
    }
  }
}
</script>
