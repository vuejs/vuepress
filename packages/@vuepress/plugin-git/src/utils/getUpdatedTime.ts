import { command } from 'execa'

/**
 * Get unix timestamp in milliseconds of the last commit
 */
export const getUpdatedTime = async (
  filePath: string,
  cwd: string
): Promise<number> => {
  const { stdout } = await command(`git log -1 --format=%at ${filePath}`, {
    cwd,
  })

  return Number.parseInt(stdout, 10) * 1000
}
