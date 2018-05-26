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
  }
}

const getLoggerFn = (color, label) => (msg, log = true) => {
  msg = chalk.reset.inverse.bold[color](` ${label} `) + ' ' + msg
  return log ? console.log(msg) : msg
}

for (const type in logTypes) {
  const { color, label } = logTypes[type]
  logger[type] = getLoggerFn(color, label)
}

logger.label = (label, msg, color = 'blue', log = true) => getLoggerFn(color, label)(msg, log)

module.exports = logger
