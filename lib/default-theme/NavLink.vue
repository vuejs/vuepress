<template>
  <router-link
    class="router-link"
    :to="link"
    v-if="!isExternal(link)"
    exact
  >{{ item.text }}</router-link>
  <a
    v-else
    :href="link"
    target="_blank"
    class="router-link"
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
