<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
      <template #before>
        <slot name="navbar-before" />
      </template>
      <template #after>
        <slot name="navbar-after" />
      </template>
    </Navbar>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar>
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="frontmatter.home" />

    <Transition
      v-else
      name="fade-slide-y"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
    >
      <Page :key="page.path">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </Transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  Transition,
} from 'vue'
import { useRouter } from 'vue-router'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '../../shared'
import Home from '../components/Home.vue'
import Page from '../components/Page.vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables'

export default defineComponent({
  name: 'Layout',

  components: {
    Home,
    Page,
    Navbar,
    Sidebar,
    Transition,
  },

  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
    const themeLocale = useThemeLocaleData()

    // navbar
    const shouldShowNavbar = computed(
      () =>
        frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
    )

    // sidebar
    const sidebarItems = useSidebarItems()
    const isSidebarOpen = ref(false)
    const toggleSidebar = (to?: boolean): void => {
      isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
    }
    const touchStart = { x: 0, y: 0 }
    const onTouchStart = (e): void => {
      touchStart.x = e.changedTouches[0].clientX
      touchStart.y = e.changedTouches[0].clientY
    }
    const onTouchEnd = (e): void => {
      const dx = e.changedTouches[0].clientX - touchStart.x
      const dy = e.changedTouches[0].clientY - touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && touchStart.x <= 80) {
          toggleSidebar(true)
        } else {
          toggleSidebar(false)
        }
      }
    }

    // classes
    const containerClass = computed(() => ({
      'no-navbar': !shouldShowNavbar.value,
      'no-sidebar': !sidebarItems.value.length,
      'sidebar-open': isSidebarOpen.value,
    }))

    // close sidebar after navigation
    let unregisterRouterHook
    onMounted(() => {
      const router = useRouter()
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false)
      })
    })
    onUnmounted(() => {
      unregisterRouterHook()
    })

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    return {
      frontmatter,
      page,
      containerClass,
      shouldShowNavbar,
      toggleSidebar,
      onTouchStart,
      onTouchEnd,
      onBeforeEnter,
      onBeforeLeave,
    }
  },
})
</script>
