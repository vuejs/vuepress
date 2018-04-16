<template>
  <router-link
    class="nav-link"
    :to="link"
    v-if="!isExternal(link)"
    :exact="link === '/'"
  >{{ item.text }}</router-link>
  <a
    v-else
    :href="link"
    target="_blank"
    class="nav-link"
    rel="noopener noreferrer"
  >{{ item.text }}</a>
</template>

<script>
  import { isExternal, ensureExt } from './util'
  export default {
    props: {
      item: {
        required: true
      }
    },
    computed: {
      link() {
        return ensureExt(this.item.link)
      }
    },
    methods: {
      isExternal
    }
  }
</script>
