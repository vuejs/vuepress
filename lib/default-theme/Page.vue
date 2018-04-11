<template>
  <div class="page">
    <Content :custom="false"/>
    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank">Edit this page</a>
      <OutboundLink/>
    </div>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
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
import OutboundLink from './OutboundLink.vue'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  components: { OutboundLink },
  computed: {
    prev () {
      const prev = this.$page.frontmatter.prev
      return prev && resolvePage(this.$site.pages, prev, this.$route.path)
    },
    next () {
      const next = this.$page.frontmatter.next
      return next && resolvePage(this.$site.pages, next, this.$route.path)
    },
    editLink () {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master'
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (repo && editLinks) {
        const base = outboundRE.test(repo)
          ? repo
          : `https://github.com/${repo}`
        return `${base}/edit/${docsBranch}/${docsDir}${path}`.replace(/\/+/g, '/')
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

.edit-link
  padding-top 0 !important
  a
    color lighten($textColor, 25%)
    margin-right 0.25rem

.page-nav.content
  min-height 2.2rem
  padding-bottom 2rem
  padding-top 0.5rem !important
  .inner
    margin-top 0 !important
    border-top 1px solid $borderColor
    padding-top 1rem
  .next
    float right
</style>
