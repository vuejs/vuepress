/* global MATOMO_SITE_ID, MATOMO_TRACKER_URL, MATOMO_ENABLE_LINK_TRACKING */

export default ({ router }) => {
  // Google analytics integration
  if (MATOMO_SITE_ID && MATOMO_TRACKER_URL) {
    var _paq = _paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    if (MATOMO_ENABLE_LINK_TRACKING) {
      _paq.push(['enableLinkTracking']);
    }
    (function() {
      var u=MATOMO_TRACKER_URL;
      _paq.push(['setTrackerUrl', u+'piwik.php']);
      _paq.push(['setSiteId', MATOMO_SITE_ID]);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
    router.afterEach(function (to) {
      _paq.push(['trackPageView', to.fullPath]);
    });
  }
}
