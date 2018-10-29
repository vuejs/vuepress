<script>
/* global _bsa */
const ID = 'bsa-cpc-script'

export default {
  render (h) {
    return h('div', { class: 'bsa-cpc-wrapper' }, [
      h('div', { ref: 'ads', class: 'bsa-cpc' })
    ])
  },
  mounted () {
    if (!document.getElementById(ID)) {
      const s = document.createElement('script')
      s.id = ID
      s.src = `//m.servedby-buysellads.com/monetization.js`
      document.head.appendChild(s)
      s.onload = () => {
        this.load()
      }
    } else {
      this.load()
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== from.path) {
        this.$refs.ads.innerHTML = ''
        this.load()
      }
    }
  },
  methods: {
    load () {
      if (typeof _bsa !== 'undefined' && _bsa) {
        _bsa.init('default', 'CKYD62QM', 'placement:vuejsorg', {
          target: '.bsa-cpc',
          align: 'horizontal',
          disable_css: 'true'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.bsa-cpc-wrapper
  font-size 0.95rem
  max-width $contentWidth
  margin 0px auto
  padding 1rem 2rem 0
  margin-bottom -1rem

@media (max-width: $MQMobileNarrow)
  .bsa-cpc-wrapper
    padding 0 1.5rem

.bsa-cpc
  font-size .9em
  background-color #f8f8f8
  border-radius 6px
  a
    &._default_
      text-align left
      display block
      padding 10px 15px 12px
      margin-bottom 20px
      color #666
      font-weight 400
      line-height 18px
      .default-image
        img
          height 20px
          border-radius 3px
          vertical-align middle
          position relative
          top -1px
      .default-title
        font-weight 600
      .default-description
        &:after
          font-size 0.85em
          content "Sponsored"
          color #1C90F3
          border 1px solid #1C90F3
          border-radius 3px
          padding 0 4px 1px
          margin-left 6px
  .default-ad
    display none

.bsa-cpc a._default_ .default-image,
.bsa-cpc a._default_ .default-title,
.bsa-cpc a._default_ .default-description
  display inline
  vertical-align middle
  margin-right 6px
</style>
