import Layout from './index.vue'
// TODO move default theme styl to core.
import '@theme/styles/theme.styl'

export default ({ Vue }) => {
  Vue.component('I18nUILayout', Layout)
}
