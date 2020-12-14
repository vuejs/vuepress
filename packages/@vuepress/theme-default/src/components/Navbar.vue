<template>
  <header ref="navbar" class="navbar">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <RouterLink :to="$themeLocale.home || $routeLocale" class="home-link">
      <img
        v-if="$themeLocale.logo"
        class="logo"
        :src="$withBase($themeLocale.logo)"
        :alt="$siteLocale.title"
      />

      <span
        v-if="$siteLocale.title"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $themeLocale.logo }"
      >
        {{ $siteLocale.title }}
      </span>
    </RouterLink>

    <div class="navbar-links-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarLinks class="can-hide" />
      <slot name="after" />
      <Docsearch />
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import NavbarLinks from './NavbarLinks.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'

export default defineComponent({
  name: 'Navbar',

  components: {
    NavbarLinks,
    ToggleSidebarButton,
  },

  emits: ['toggle-sidebar'],

  setup() {
    const navbar = ref<HTMLElement | null>(null)
    const siteName = ref<HTMLElement | null>(null)
    const linksWrapperMaxWidth = ref(0)
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) {
        return {}
      }
      return {
        'max-width': linksWrapperMaxWidth.value + 'px',
      }
    })

    // avoid overlapping of long title and long navbar links
    onMounted(() => {
      // TODO: migrate to css var
      // refer to config.styl
      const MOBILE_DESKTOP_BREAKPOINT = 719
      const NAVBAR_VERTICAL_PADDING =
        getCssValue(navbar.value, 'paddingLeft') +
        getCssValue(navbar.value, 'paddingRight')
      const handleLinksWrapWidth = (): void => {
        if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapperMaxWidth.value = 0
        } else {
          linksWrapperMaxWidth.value =
            navbar.value!.offsetWidth -
            NAVBAR_VERTICAL_PADDING -
            (siteName.value?.offsetWidth || 0)
        }
      }
      handleLinksWrapWidth()
      window.addEventListener('resize', handleLinksWrapWidth, false)
    })

    return {
      navbar,
      siteName,
      linksWrapperStyle,
    }
  },
})

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>
