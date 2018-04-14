<template>
  <h1>fooooo</h1>
</template>

<script>
export default {
  created () {
    import('./non-browser-firendly.js').then(m => {
      console.log('imported!!!')
    })
  }
}
</script>
