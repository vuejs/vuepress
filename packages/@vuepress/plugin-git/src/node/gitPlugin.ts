import type { Plugin } from '@vuepress/core'
import type { GitData } from './types'
import {
  checkGitRepo,
  getContributors,
  getCreatedTime,
  getUpdatedTime,
} from './utils'

/**
 * Options of @vuepress/plugin-git
 */
export interface GitPluginOptions {
  /**
   * Whether to get the created time of a page
   */
  createdTime?: boolean

  /**
   * Whether to get the updated time of a page
   */
  updatedTime?: boolean

  /**
   * Whether to get the contributors of a page
   */
  contributors?: boolean
}

export const gitPlugin: Plugin<GitPluginOptions> = (
  { createdTime, updatedTime, contributors },
  app
) => {
  const cwd = app.dir.source()
  const isGitRepoValid = checkGitRepo(cwd)

  return {
    name: '@vuepress/plugin-git',

    extendsPageData: async (page) => {
      const git: GitData = {}

      if (!isGitRepoValid || page.filePathRelative === null) {
        return { git }
      }

      if (createdTime !== false) {
        git.createdTime = await getCreatedTime(page.filePathRelative, cwd)
      }

      if (updatedTime !== false) {
        git.updatedTime = await getUpdatedTime(page.filePathRelative, cwd)
      }

      if (contributors !== false) {
        git.contributors = await getContributors(page.filePathRelative, cwd)
      }

      return { git }
    },
  }
}

export default gitPlugin
