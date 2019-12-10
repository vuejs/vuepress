<template>
  <div class="svg-container">
    <slot />
  </div>
</template>

<style lang="stylus">
.svg-container
  margin 30px auto
  text-align center
  & > svg
    max-width 100%
</style>
