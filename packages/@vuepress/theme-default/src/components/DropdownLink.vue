<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow down" />
    </button>

    <button
      class="mobile-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{ item.text }}</span>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(child, index) in item.children"
          :key="child.link || index"
          class="dropdown-item"
        >
          <template v-if="child.children">
            <h4>{{ subItem.text }}</h4>

            <ul class="dropdown-subitem-wrapper">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="dropdown-subitem"
              >
                <NavLink
                  :item="grandchild"
                  @focusout="
                    isLastItemOfArray(grandchild, child.children) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <NavLink
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavGroup, NavItem } from '../types'
import DropdownTransition from './DropdownTransition.vue'
import NavLink from './NavLink.vue'

export default defineComponent({
  name: 'DropdownLink',

  components: {
    DropdownTransition,
    NavLink,
  },

  props: {
    item: {
      type: Object as PropType<NavGroup<NavItem>>,
      required: true,
    },
  },

  setup(props) {
    const { item } = toRefs(props)
    const dropdownAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    )

    const open = ref(false)
    const route = useRoute()
    watch(
      () => route.path,
      () => {
        open.value = false
      }
    )

    /**
     * Open the dropdown when user tab and click from keyboard.
     *
     * Use event.detail to detect tab and click from keyboard.
     * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
     */
    const handleDropdown = (e): void => {
      const isTriggerByTab = e.detail === 0
      if (isTriggerByTab) {
        open.value = !open.value
      }
    }

    const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
      arr[arr.length - 1] === item

    return {
      open,
      dropdownAriaLabel,
      handleDropdown,
      isLastItemOfArray,
    }
  },
})
</script>

<style lang="stylus">
@require '../styles/config.styl'

.dropdown-wrapper
  cursor pointer
  .dropdown-title
    display block
    font-size 0.9rem
    font-family inherit
    cursor inherit
    padding inherit
    line-height 1.4rem
    background transparent
    border none
    font-weight 500
    color $textColor
    &:hover
      border-color transparent
    .arrow
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem
  .mobile-dropdown-title
    @extends .dropdown-title
    display none
    font-weight 600
    font-size inherit
      &:hover
        color $accentColor
  .nav-dropdown
    .dropdown-item
      color inherit
      line-height 1.7rem
      h4
        margin 0.45rem 0 0
        border-top 1px solid #eee
        padding 1rem 1.5rem 0.45rem 1.25rem
      .dropdown-subitem-wrapper
        padding 0
        list-style none
        .dropdown-subitem
          font-size 0.9em
      a
        display block
        line-height 1.7rem
        position relative
        border-bottom none
        font-weight 400
        margin-bottom 0
        padding 0 1.5rem 0 1.25rem
        &:hover
          color $accentColor
        &.router-link-active
          color $accentColor
          &::after
            content ""
            width 0
            height 0
            border-left 5px solid $accentColor
            border-top 3px solid transparent
            border-bottom 3px solid transparent
            position absolute
            top calc(50% - 2px)
            left 9px
      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0

@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem
    .dropdown-title
      display: none
    .mobile-dropdown-title
      display: block
    .nav-dropdown
      transition height .1s ease-out
      overflow hidden
      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0
        h4, & > a
          font-size 15px
          line-height 2rem
        .dropdown-subitem
          font-size 14px
          padding-left 1rem

@media (min-width: $MQMobile)
  .dropdown-wrapper
    height 1.8rem
    &:hover .nav-dropdown,
    &.open .nav-dropdown
      // override the inline style.
      display block !important
    &.open:blur
      display none
    .nav-dropdown
      display none
      // Avoid height shaked by clicking
      height auto !important
      box-sizing border-box;
      max-height calc(100vh - 2.7rem)
      overflow-y auto
      position absolute
      top 100%
      right 0
      background-color #fff
      padding 0.6rem 0
      border 1px solid #ddd
      border-bottom-color #ccc
      text-align left
      border-radius 0.25rem
      white-space nowrap
      margin 0
</style>
