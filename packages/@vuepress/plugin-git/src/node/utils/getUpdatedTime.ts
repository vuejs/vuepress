import * as execa from 'execa'

/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'log', '-1', '--format=%at', filePath],
    {
      cwd,
    }
  )

  return Number.parseInt(stdout, 10) * 1000
}
