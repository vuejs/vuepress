import { removeLeadingSlash, removeEndingSlash } from '@vuepress/shared'
import { resolveRepoType } from './resolveRepoType'

export const editLinkPatternGithub = ':repo/edit/:branch/:path'
export const editLinkPatternGitlab = ':repo/-/edit/:branch/:path'
export const editLinkPatternBitbucket =
  ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default'

export const resolveEditLink = ({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern,
}: {
  docsRepo: string
  docsBranch: string
  docsDir: string
  filePathRelative: string
  editLinkPattern?: string
}): string | null => {
  const repoType = resolveRepoType(docsRepo)

  let pattern: string | null = null

  if (editLinkPattern) {
    pattern = editLinkPattern
  } else if (repoType === 'GitHub') {
    pattern = editLinkPatternGithub
  } else if (repoType === 'GitLab') {
    pattern = editLinkPatternGitlab
  } else if (repoType === 'Bitbucket') {
    pattern = editLinkPatternBitbucket
  }

  if (!pattern) return null

  return pattern
    .replace(
      /:repo/,
      repoType === 'GitHub' ? `https://github.com/${docsRepo}` : docsRepo
    )
    .replace(/:branch/, docsBranch)
    .replace(
      /:path/,
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`)
    )
}
