import Content from '../../lib/app/components/Content'
import { mount } from '@vue/test-utils'
import modeTestRunner from '@vuepress/test-utils/modeTestRunner'
import getRouter from '@vuepress/test-utils/getRouter'

function test (mode, localVue) {
  it(`${mode} - add custom class by default.`, () => {
    const wrapper = mount(Content, {
      localVue,
      router: getRouter()
    })
    expect(wrapper.contains('.custom')).toBe(true)
  })

  it(`${mode} - remove custom when custom set to false.`, () => {
    const wrapper = mount(Content, {
      // https://vue-test-utils.vuejs.org/api/options.html#context
      context: {
        props: {
          custom: false
        }
      },
      localVue,
      router: getRouter()
    })
    expect(wrapper.contains('.custom')).toBe(false)
  })
}

modeTestRunner('Content', test)

