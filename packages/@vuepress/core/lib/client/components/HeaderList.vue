<template>
  <component :is="listType[0]">
    <li v-for="(item, index) in items" :key="index">
      <router-link :to="'#' + item.slug" v-text="item.title" />
      <HeaderList v-if="item.children" :items="item.children" :list-type="innerListType" />
    </li>
  </component>
</template>

<script>
export default {
  name: 'HeaderList',
  props: ['items', 'listType'],
  computed: {
    innerListType () {
      return this.listType.slice(Math.min(this.listType.length - 1, 1))
    }
  }
}
</script>
