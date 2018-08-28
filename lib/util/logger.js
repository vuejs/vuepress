const chalk = require('chalk')

const logger = {}

const logTypes = {
  success: {
    color: 'green',
    label: 'DONE'
  },
  error: {
    color: 'red',
    label: 'FAIL'
  },
  warn: {
    color: 'yellow',
    label: 'WARN'
  },
  tip: {
    color: 'cyan',
    label: 'TIP'
  },
  wait: {
    color: 'blue',
    label: 'WAIT'
  }
}

const getLoggerFn = (color, label) => (msg, log = true) => {
  let newLine = false
  if (msg.startsWith('\n')) {
    if (log) msg = msg.slice(1)
    newLine = true
  }
  msg = chalk.reset.inverse.bold[color](` ${label} `) + ' ' + msg
  if (log) {
    console.log(newLine ? '\n' + msg : msg)
  } else {
    return msg
  }
}

for (const type in logTypes) {
  const { color, label } = logTypes[type]
  logger[type] = getLoggerFn(color, label)
}

module.exports = logger
