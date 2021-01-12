import type { RequestHandler } from 'express'

/**
 * A middleware to add trailing slash to the url
 *
 * It will redirect '/foo' to '/foo/' with 302
 */
export const trailingSlashMiddleware: RequestHandler = (req, res, next) => {
  if (
    // only add trailing slash in GET and HEAD requests
    !['GET', 'HEAD'].includes(req.method) ||
    // if the last section of the path has a dot, we think it has extension
    // and should not add trailing slash
    req.path.split('/').pop()?.includes('.') ||
    // if the path already has trailing slash
    req.path.endsWith('/')
  ) {
    return next()
  }

  // add trailing slash and retain query
  // notice that we should not use 301 in dev-server
  const query = req.url.slice(req.path.length)
  res.redirect(302, `${req.path}/${query}`)
}
