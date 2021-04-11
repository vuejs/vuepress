import * as chalk from 'chalk'

export const info = (...args: any[]): void => {
  console.log(chalk.cyan('info'), ...args)
}

export const tip = (...args: any[]): void => {
  console.log(chalk.blue('tip'), ...args)
}

export const success = (...args: any[]): void => {
  console.log(chalk.green('success'), ...args)
}

export const warn = (...args: any[]): void => {
  console.warn(chalk.yellow('warning'), ...args)
}

export const error = (...args: any[]): void => {
  console.error(chalk.red('error'), ...args)
}

export const createError = (message?: string | undefined): Error => {
  error(message)
  return new Error(message)
}

export const logger = {
  info,
  tip,
  success,
  warn,
  error,
  createError,
}
