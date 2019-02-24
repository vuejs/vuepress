// In VuePress, we have following convention about routing:
//
//   - `/foo/` means source file is `/foo/{README|index}.md`
//   - `/foo.html` means your source file is `/foo.md`
//
// The original design of VuePress relied on above two styles
// of routing, especially the calculation involved of routes at
// default theme. so we can't easily modify `/foo.html` directly
// to `/foo` (i.e. remove html suffix)
//
// This "temporary" utility handles redirect of clean urls, with
// this utility, you'll get:
//
// For unknown request `/foo`
//   - redirect to `/foo.html` if it exists
//   - redirect to `/foo/` if it exists
//
// For unknown request `/foo/`
//   - redirect to `/foo.html` if it exists
//
// If all the above redirect rules don't exist, you'll get a 404

export function handleRedirectForCleanUrls (router) {
  router.beforeEach((to, from, next) => {
    if (isRouteExists(router, to.path)) {
      next()
    } else {
      if (!/(\/|\.html)$/.test(to.path)) {
        const endingSlashUrl = to.path + '/'
        const endingHtmlUrl = to.path + '.html'
        if (isRouteExists(router, endingHtmlUrl)) {
          next(endingHtmlUrl)
        } else if (isRouteExists(router, endingSlashUrl)) {
          next(endingSlashUrl)
        } else {
          next()
        }
      } else if (/\/$/.test(to.path)) {
        const endingHtmlUrl = to.path.replace(/\/$/, '') + '.html'
        if (isRouteExists(router, endingHtmlUrl)) {
          next(endingHtmlUrl)
        } else {
          next()
        }
      } else {
        next()
      }
    }
  })
}

function isRouteExists (router, path) {
  return router.options.routes.filter(route => route.path.toLowerCase() === path.toLowerCase()).length > 0
}
