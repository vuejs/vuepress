<template>
  <div class="page">
    <Content/>
    <div class="content page-nav" v-if="prev || next">
      <p>
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { resolvePage } from './util'

export default {
  computed: {
    prev () {
      const prev = this.$page.frontmatter.prev
      return prev && resolvePage(this.$site.pages, prev, this.$route.path)
    },
    next () {
      const next = this.$page.frontmatter.next
      return next && resolvePage(this.$site.pages, next, this.$route.path)
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

.page-nav.content
  padding-top 0
  min-height 2.2rem
  p
    margin 0
    border-top 1px solid $borderColor
    padding-top 1rem
  .next
    float right
</style>
