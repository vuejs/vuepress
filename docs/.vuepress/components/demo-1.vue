<template>
  <p class="demo">
    {{ msg }}
    <button @click='test'>click</button>
  </p>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello this is <demo-1>'
    }
  },
  methods:{
    async test(){
      const r = await 1
      window.alert(this.msg)
    }
  }
}
</script>
