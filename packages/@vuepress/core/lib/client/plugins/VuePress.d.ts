import { Store } from './Store'

declare module 'vue/types/vue' {
  export interface Vue {
    $vuepress: Store
    $hasComponent (key: string): boolean
  }
}
