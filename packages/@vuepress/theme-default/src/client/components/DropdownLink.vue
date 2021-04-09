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

    <!-- Transition will somehow break the Select Languages dropdown -->
    <!-- So we remove DropdownTransition until we figure out the reason -->
    <ul v-show="open" class="nav-dropdown">
      <li
        v-for="(child, index) in item.children"
        :key="child.link || index"
        class="dropdown-item"
      >
        <template v-if="child.children">
          <h4 class="dropdown-subtitle">
            <NavLink
              v-if="child.link"
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) &&
                  child.children.length === 0 &&
                  (open = false)
              "
            />

            <span v-else>{{ child.text }}</span>
          </h4>

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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import type { NavGroup, NavItem } from '../../shared'
import NavLink from './NavLink.vue'

export default defineComponent({
  name: 'DropdownLink',

  components: {
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
      } else {
        open.value = false
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
