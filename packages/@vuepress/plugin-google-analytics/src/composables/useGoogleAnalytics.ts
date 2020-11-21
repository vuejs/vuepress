import { START_LOCATION } from 'vue-router'
import type { Router } from 'vue-router'

declare const ga: (...args: any) => void

export interface UseGoogleAnalyticsOptions {
  id: string
  router: Router
}

/**
 * Add analytics.js to your site
 *
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs
 */
export const useGoogleAnalytics = ({
  id,
  router,
}: UseGoogleAnalyticsOptions): void => {
  // @ts-ignore
  // eslint-disable-next-line
  ;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', id, 'auto')
  ga('set', 'anonymizeIp', true)

  router.afterEach((to, from) => {
    // send pv after the route is changed
    // notice vue-router will trigger an initial navigation from `START_LOCATION`
    if (to.path !== from.path || from === START_LOCATION) {
      ga('set', 'page', to.path)
      ga('send', 'pageview')
    }
  })
}
