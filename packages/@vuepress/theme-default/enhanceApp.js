export default ({ Vue }) => {
  Vue.component('Badge', () => import('./components/Badge.vue'))
}
