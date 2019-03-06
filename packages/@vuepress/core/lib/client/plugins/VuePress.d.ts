import { Store } from './Store';
import { AsyncComponent } from 'vue'

declare class VuePress extends Store {
  isPageExists (pageKey: string): boolean;

  isLayoutExists (pageKey: string): boolean;
}

declare module "vue/types/vue" {
  export interface Vue {
    $vuepress: VuePress;
  }
}
