import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { SiteDataRef } from '../injections'

export type ClientAppEnhance = (context: {
  app: App
  router: Router
  siteData: SiteDataRef
}) => void | Promise<void>
