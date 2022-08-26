const logger = require('./logger')
module.exports.Setup = logger.SetupLogger
module.exports.logger = {
    error: logger.error,
    warn: logger.warn,
    info: logger.info,
    verbose: logger.verbose,
    debug: logger.debug,
    silly: logger.silly
}
