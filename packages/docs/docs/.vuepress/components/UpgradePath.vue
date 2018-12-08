<script>
export default {
  functional: true,
  props: {
    title: String,
    required: true
  },
  render (h, { props, slots }) {
    return h('div',
      {
        class: ['upgrade-path']
      },
      [
        h('h4', props.title || 'Upgrade Path'),
        slots().default
      ]
    )
  }
}
</script>

<style lang="stylus">
  .upgrade-path
    margin-top: 2em
    padding: 2em
    background: rgba(73, 195, 140, .1)
    border-radius: 2px
    > h4
      margin-top: 0
    > p:last-child
      margin-bottom: 0
      padding-bottom: 0
</style>
