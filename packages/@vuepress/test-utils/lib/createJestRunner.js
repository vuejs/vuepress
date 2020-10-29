const execa = require('execa')

const usedPorts = []

/**
 * Run jest
 *
 * @param {array} jestArgs an array of Jest CLI options
 * @param {boolean} debug whether start with '--inspect-brk' or not
 */

module.exports = function createJestRunner (jestArgs, debug) {
  return async function () {
    const execArgv = getChildProcessExecArgv()
    const args = [require.resolve('jest-cli/bin/jest'), ...execArgv, ...jestArgs]
    if (debug) args.unshift('--inspect-brk')
    console.log(`running node with args: ${args.join(' ')}`)
    await execa('node', args, {
      stdio: 'inherit'
    })
  }
}

function getChildProcessExecArgv () {
  const execArgv = process.execArgv.slice(0)
  const inspectArgvIndex = execArgv.findIndex(argv =>
    argv.includes('--inspect-brk')
  )

  if (inspectArgvIndex > -1) {
    const inspectArgv = execArgv[inspectArgvIndex]
    execArgv.splice(
      inspectArgvIndex,
      1,
      inspectArgv.replace(/--inspect-brk=(.*)/, (match, s1) => {
        let port
        try {
          port = parseInt(s1) + 1
        } catch (e) {
          port = 9230 // node default inspect port plus 1.
        }
        if (usedPorts.includes(port)) {
          port++
        }
        usedPorts.push(port)
        return `--inspect-brk=${port}`
      })
    )
  }

  return execArgv
}
