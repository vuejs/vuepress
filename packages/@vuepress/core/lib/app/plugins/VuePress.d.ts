import { Store } from './Store';

declare class VuePress extends Store {

}

declare module "vue/types/vue" {
  interface Vue {
    $vuepress: Store;
  }
}
