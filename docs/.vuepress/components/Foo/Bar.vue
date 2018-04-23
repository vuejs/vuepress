<template>
  <p class="demo">
    {{ msg }}
  </p>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello this is <Foo-Bar>'
    }
  }
}
</script>
