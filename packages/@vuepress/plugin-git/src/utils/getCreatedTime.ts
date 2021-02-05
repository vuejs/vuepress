import * as execa from 'execa'

/**
 * Get unix timestamp in milliseconds of the first commit
 */
export const getCreatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'log', '--diff-filter=A', '--format=%at', filePath],
    {
      cwd,
    }
  )

  return Number.parseInt(stdout, 10) * 1000
}
