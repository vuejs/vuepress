<template>
  <HeaderList :items="groupedHeaders" />
</template>

<script>

import HeaderList from './HeaderList.vue'

function groupHeaders (headers, startLevel = 1) {
  const list = []
  let index = 0
  while (index < headers.length) {
    const header = headers[index]
    if (header.level < startLevel) break
    if (header.level > startLevel) {
      const result = groupHeaders(headers.slice(index), header.level)
      if (list.length) {
        list[list.length - 1].children = result.list
      } else {
        list.push(...result.list)
      }
      index += result.index
    } else {
      list.push({ ...header })
      index += 1
    }
  }
  return { list, index }
}

export default {
  components: { HeaderList },

  computed: {
    groupedHeaders () {
      return groupHeaders(this.$page.headers).list
    }
  }
}

</script>

<style lang="stylus" scoped>

</style>
