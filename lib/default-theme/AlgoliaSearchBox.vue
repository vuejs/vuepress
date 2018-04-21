<template>
  <form id="search-form" class="algolia-search-wrapper search-box">
    <input id="algolia-search-input" class="search-query st-default-search-input">
  </form>
</template>

<script>
export default {
  props: ['options'],
  mounted () {
    Promise.all([
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'),
      import(/* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css')
    ]).then(([docsearch]) => {
      docsearch = docsearch.default
      docsearch(Object.assign(this.options, {
        inputSelector: '#algolia-search-input',
        autocompleteOptions: {
          openOnFocus: true
        }
      }))
    })
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

// TODO align with styles/config.styl
$border = #ddd
$dark   = #2c3e50
$medium = #34495e
$light  = #7f8c8d
$green  = #42b983
$border = #dddddd
$codebg = #f8f8f8
$red = #ff6666
$info = #1C90F3

.algolia-search-wrapper
  & > span
    vertical-align middle
  .algolia-autocomplete
    line-height normal
    & > input:first-child
      display none
    .ds-dropdown-menu
      background-color #fff
      border 1px solid #999
      border-radius 4px
      font-size 16px
      margin 6px 0 0
      padding 4px
      text-align left
      &:before
        border-color #999
      [class*=ds-dataset-]
        border none
        padding 0
      .ds-suggestions
        margin-top 0
      .ds-suggestion
        border-bottom 1px solid $border
    .algolia-docsearch-suggestion--highlight
      color #2c815b
    .algolia-docsearch-suggestion
      border-color $border
      padding 0
      .algolia-docsearch-suggestion--category-header
        padding 5px 10px
        margin-top 0
        background $green
        color #fff
        font-weight 600
        .algolia-docsearch-suggestion--highlight
          background rgba(255, 255, 255, 0.6)
      .algolia-docsearch-suggestion--wrapper
        padding 0
      .algolia-docsearch-suggestion--title
        font-weight 600
        margin-bottom 0
        color $dark
      .algolia-docsearch-suggestion--subcategory-column
        vertical-align top
        padding 5px 7px 5px 5px
        border-color $border
        background #f1f3f5
        &:after
          display none
      .algolia-docsearch-suggestion--subcategory-column-text
        color #555
    .algolia-docsearch-footer
      border-color $border
    .ds-cursor .algolia-docsearch-suggestion--content
      background-color #e7edf3!important
      color $dark

@media (min-width: $MQMobile)
  .algolia-search-wrapper
    .algolia-autocomplete
      .algolia-docsearch-suggestion
        .algolia-docsearch-suggestion--subcategory-column
          float none
          width 150px
          min-width 150px
          display table-cell
        .algolia-docsearch-suggestion--content
          float none
          display table-cell
          width 100%
          vertical-align top
        .ds-dropdown-menu
          min-width 515px!important

@media (max-width: $MQMobile)
  .algolia-search-wrapper
    .algolia-docsearch-suggestion--wrapper
      padding 5px 7px 5px 5px!important
    .algolia-docsearch-suggestion--subcategory-column
      padding 0!important
      background white!important
    .algolia-docsearch-suggestion--subcategory-column-text:after
      content " > "
      font-size 10px
      line-height 14.4px
      display inline-block
      width 5px
      margin -3px 3px 0
      vertical-align middle

@media (max-width: $MQMobileNarrow)
  .ds-dropdown-menu
    min-width 320px!important
    max-width 320px!important

</style>
