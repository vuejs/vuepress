<template>
  <h1>Layout.vue</h1>

  <Logo />

  <Content />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '../components/Logo.vue'

export default defineComponent({
  components: { Logo },
  setup() {},
})
</script>
