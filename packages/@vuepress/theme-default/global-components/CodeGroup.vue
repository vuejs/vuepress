<template>
  <div class="theme-code-group">
    <div class="theme-code-group__nav">
      <button
        v-for="(tab, i) in codeTabs"
        :key="tab.title"
        class="theme-code-group__nav-tab"
        :class="{'theme-code-group__nav-tab-active': i === activeCodeTabIndex}"
        @click="changeCodeTab(i)"
      >
        {{ tab.title }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CodeGroup',
  data () {
    return {
      codeTabs: [],
      activeCodeTabIndex: 0
    }
  },
  watch: {
    activeCodeTabIndex (index) {
      this.codeTabs.forEach(tab => {
        tab.elm.classList.remove('theme-code-block__active')
      })
      this.codeTabs[index].elm.classList.add('theme-code-block__active')
    }
  },
  mounted () {
    this.codeTabs = this.$slots.default.filter(slot => Boolean(slot.componentOptions)).map(slot => ({
      title: slot.componentOptions.propsData.title,
      elm: slot.elm
    }))
  },
  methods: {
    changeCodeTab (index) {
      this.activeCodeTabIndex = index
    }
  }
}
</script>

<style scoped>
  .theme-code-group {}
  .theme-code-group__nav {
    margin-bottom: -35px;
    background-color: #282c34;
    padding-bottom: 22px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    font-size: 1.5rem;
  }
  .theme-code-group__nav-tab {
    border: 0;
    padding: 5px;
    cursor: pointer;
    background-color: transparent;
    color: white;
  }
  .theme-code-group__nav-tab-active {
    border-bottom: #42b983 1px solid;
  }
</style>
