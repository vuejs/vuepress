import * as ora from 'ora'

export const withSpinner = (msg: string) => async <T>(
  target: () => Promise<T>
): Promise<T> => {
  const spinner = ora()
  try {
    spinner.start(msg)
    const result = await target()
    spinner.succeed(`${msg} - done`)
    return result
  } catch (e) {
    spinner.fail(`${msg} - failed`)
    throw e
  }
}
