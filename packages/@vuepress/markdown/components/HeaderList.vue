<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <router-link :to="'#' + item.slug" v-text="item.title" />
      <HeaderList v-if="item.children" :items="item.children" />
    </li>
  </ul>
</template>

<script>

export default {
  name: 'HeaderList',
  props: ['items']
}

</script>
