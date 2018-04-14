<template>
  <router-link
    class="router-link"
    :to="item.link"
    v-if="!isExternal(item.link)"
  >{{ item.text }}</router-link>
  <a
    v-else
    :href="item.link"
    target="_blank"
    class="router-link"
  >{{ item.text }}</a>
</template>

<script>
  import { isExternal } from './util'
  export default {
    props: {
      item: {
        required: true
      }
    },
    methods: {
      isExternal
    }
  }
</script>
