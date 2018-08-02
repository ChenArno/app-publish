const log4js = require('log4js');

log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: 'logs/cheese',
      encoding: "utf-8",
      maxLogSize: 1000000,
      numBackups: 3,
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'info'
    },
    error: {
      appenders: ["cheese"],
      level: "error"
    }
  }
})
const logger = log4js.getLogger('cheese');
module.exports = logger