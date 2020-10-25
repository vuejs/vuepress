<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import type { VNode } from 'vue'

export default defineComponent({
  name: 'CodeGroup',

  setup(_, { slots }) {
    // index of current active item
    const activeIndex = ref(-1)

    // method to change current active item
    const changeActiveIndex = (i: number): void => {
      activeIndex.value = i
    }

    return () => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won't be changed once the
      // `setup()` function of current component is called

      // get children code-group-item
      const items = (slots.default?.() || [])
        .filter(
          (vnode) =>
            // @ts-ignore
            vnode.type.name === 'CodeGroupItem'
        )
        .map((vnode) => {
          if (vnode.props === null) {
            vnode.props = {}
          }
          return vnode as VNode & { props: Exclude<VNode['props'], null> }
        })

      // do not render anything if there is no code-group-item
      if (items.length === 0) {
        return null
      }

      if (activeIndex.value === -1) {
        // initial state

        // find the index of the code-group-item with `active` props
        activeIndex.value = items.findIndex(
          (vnode) => vnode.props.active === '' || vnode.props.active === true
        )

        // if there is no `active` props on code-group-item, set the first item active
        if (activeIndex.value === -1) {
          changeActiveIndex(0)
        }
      } else {
        // re-render triggered by modifying `activeIndex` ref

        // set the active item
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value
        })
      }

      return h('div', { class: 'code-group' }, [
        h(
          'div',
          { class: 'code-group__nav' },
          h(
            'ul',
            { class: 'code-group__ul' },
            items.map((vnode, i) =>
              h(
                'li',
                { class: 'code-group__li' },
                h(
                  'button',
                  {
                    class: `code-group__nav-tab${
                      i === activeIndex.value
                        ? ' code-group__nav-tab-active'
                        : ''
                    }`,
                    onClick: () => changeActiveIndex(i),
                  },
                  vnode.props.title
                )
              )
            )
          )
        ),
        items,
      ])
    }
  },
})
</script>

<style lang="stylus">
@require('../../styles/config')

.code-group {}
.code-group__nav {
  margin-bottom: -35px;
  background-color: $codeBgColor;
  padding-bottom: 22px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding-left: 10px;
  padding-top: 10px;
}
.code-group__ul {
  margin: auto 0;
  padding-left: 0;
  display: inline-flex;
  list-style: none;
}
.code-group__li {}
.code-group__nav-tab {
  border: 0;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  font-size: 0.85em;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}
.code-group__nav-tab:focus {
  outline: none;
}
.code-group__nav-tab-active {
  border-bottom: $accentColor 1px solid;
}
</style>
