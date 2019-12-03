import { Store } from './Store'
import { AsyncComponent } from 'vue'

declare class VuePress extends Store {
  isPageExists (pageKey: string): boolean;

  isPageLoaded (pageKey: string): boolean;

  getPageAsyncComponent (pageKey: string): () => Promise<AsyncComponent>;

  loadPageAsyncComponent (pageKey: string): Promise<AsyncComponent>;

  registerPageAsyncComponent (pageKey: string): void;
}

declare module 'vue/types/vue' {
  export interface Vue {
    $vuepress: VuePress;
  }
}
