import * as execa from 'execa'
import type { GitContributor } from '../types'

export const getContributors = async (
  filePath: string,
  cwd: string
): Promise<GitContributor[]> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'shortlog', '-nes', '--', filePath],
    {
      cwd,
      stdin: 'inherit',
    }
  )

  return stdout
    .split('\n')
    .map((item) => item.trim().match(/^(\d+)\t(.*) <(.*)>$/))
    .filter((item): item is RegExpMatchArray => item !== null)
    .map(([, commits, name, email]) => ({
      name,
      email,
      commits: Number.parseInt(commits, 10),
    }))
}
