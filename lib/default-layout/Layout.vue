<template>
  <div id="container">
    <Index v-if="$page.isIndex" />
    <Page v-else />
  </div>
</template>

<script>
import Index from './Index.vue'
import Page from './Page.vue'

export default {
  components: { Index, Page }
}
</script>
