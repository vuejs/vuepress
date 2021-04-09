import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType, VNode } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { usePageData } from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import type { TocPropsOptions } from '../../shared'

export type TocPropsHeaders = PageHeader[]

export interface TocProps {
  headers: TocPropsHeaders
  options: TocPropsOptions
}

const renderLink = (
  header: PageHeader,
  options: TocPropsOptions,
  route: RouteLocationNormalizedLoaded
): VNode => {
  const hash = `#${header.slug}`
  const linkClass = [options.linkClass]

  // add active class if the header hash is matched
  if (options.linkActiveClass && route.hash === hash) {
    linkClass.push(options.linkActiveClass)
  }

  // add active class if any sub-header hash is matched
  if (
    options.linkChildrenActiveClass &&
    header.children.some((item) => `#${item.slug}` === route.hash)
  ) {
    linkClass.push(options.linkChildrenActiveClass)
  }

  if (options.linkTag === 'RouterLink') {
    return h(
      RouterLink,
      {
        to: hash,
        class: linkClass,
        ariaLabel: header.title,
      },
      {
        default: () => header.title,
      }
    )
  }

  return h(
    'a',
    {
      href: hash,
      class: linkClass,
      ariaLabel: header.title,
    },
    header.title
  )
}

const renderHeaders = (
  headers: PageHeader[],
  options: TocPropsOptions,
  route: RouteLocationNormalizedLoaded
): VNode[] => {
  if (headers.length === 0) {
    return []
  }

  return [
    h(
      'ul',
      {
        class: options.listClass,
      },
      headers.map((header) =>
        h(
          'li',
          {
            class: options.itemClass,
          },
          [
            renderLink(header, options, route),
            renderHeaders(header.children, options, route),
          ]
        )
      )
    ),
  ]
}

export const Toc = defineComponent({
  name: 'Toc',

  props: {
    headers: {
      type: Array as PropType<TocPropsHeaders>,
      required: false,
      default: null,
    },

    options: {
      type: Object as PropType<Partial<TocPropsOptions>>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props) {
    const { headers: propsHeaders, options: propsOptions } = toRefs(props)

    const route = useRoute()
    const page = usePageData()
    const headers = computed<TocPropsHeaders>(
      () => propsHeaders.value || page.value.headers
    )
    const options = computed<TocPropsOptions>(() => ({
      containerTag: 'nav',
      containerClass: 'vuepress-toc',
      listClass: 'vuepress-toc-list',
      itemClass: 'vuepress-toc-item',
      linkTag: 'RouterLink',
      linkClass: 'vuepress-toc-link',
      linkActiveClass: 'active',
      linkChildrenActiveClass: 'active',
      ...propsOptions.value,
    }))

    return () => {
      const renderedHeaders = renderHeaders(headers.value, options.value, route)

      if (options.value.containerTag) {
        return h(
          options.value.containerTag,
          {
            class: options.value.containerClass,
          },
          renderedHeaders
        )
      }

      return renderedHeaders
    }
  },
})
