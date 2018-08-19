<style lang="stylus">
  .code-copy
    color #aaa
    display inline-block
    cursor pointer
  div[class*="language-"] pre .code-copy
      position absolute
      z-index 1000
      top 35px
      right 5px
      width 20px
      height 30px
      content url(./copy.svg)
      opacity 0
  div[class*="language-"] pre:hover .code-copy
    opacity 1
</style>

<script>
export default {
  name: 'ClipboardCopy'
}
</script>
