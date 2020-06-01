// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n`
      + chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      )
      + `    ${chalk.green(
        `fix(view): handle keep-alive with aborted navigations`
      )}\n`
      + `    ${chalk.green(
        `fix(view): handle keep-alive with aborted navigations (close #28)`
      )}\n\n`
      + chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
