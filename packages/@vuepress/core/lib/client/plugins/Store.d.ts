import Vue from 'vue'

export declare class Store {
  store: Vue;

  $get(key: string): any;

  $set(key: string, value: any): void;

  $emit: typeof Vue.prototype.$emit;

  $on: typeof Vue.prototype.$on;
}


