import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { SiteData } from '../injections'

export type ClientAppEnhance = (context: {
  app: App
  router: Router
  siteData: SiteData
}) => void | Promise<void>
