exports.getUrlSafePath = rawPath => {
  const [path, anchor] = rawPath.split(/#(?=[^#]*$)/)
  return (
    path
      .split(/[/\\]+/)
      .map(name => encodeURIComponent(name))
      .join('/')
  ) + (anchor ? `#${anchor}` : '')
}
