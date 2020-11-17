export * from './clientAppEnhance'
export * from './clientAppSetup'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
