<template>
  <h1 class="layout-title">Layout.vue</h1>

  <Logo />

  <Content />

  <Debug />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '../components/Logo.vue'

export default defineComponent({
  components: { Logo },
})
</script>

<style>
.layout-title {
  color: #42b883;
}
</style>
