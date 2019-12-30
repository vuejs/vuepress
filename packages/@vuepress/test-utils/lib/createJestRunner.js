const execa = require('execa')

const usedPorts = []

/**
 * Run jest
 *
 * @param {array} jestArgs an array of Jest CLI options
 * @param {array} rawArgs the processed process.argv - contains '--inspect-brk' for debug
 */

module.exports = function createJestRunner (jestArgs, rawArgs) {
  return async function () {
    const execArgv = getChildProcessExecArgv()
    const args = [...execArgv, ...jestArgs]
    console.log(`running node with args: ${args.join(' ')}`)
    args.unshift(...rawArgs, require.resolve('jest-cli/bin/jest'))
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
