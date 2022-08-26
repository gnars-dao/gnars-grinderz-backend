const winston = require('winston')
require('winston-daily-rotate-file')
const config = require('../../config')
const BaseError = require('../error/base-error')
const { format } = winston

const fileTransport = new winston.transports.DailyRotateFile({
    filename: config.appName + '-%DATE%.log',
    frequency: '1h',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    dirname: './log'
})

let logger

function SetupLogger() {
    logger = winston.createLogger({
        format: format.combine(format.errors({ stack: true }), format.metadata(), format.json()),
        level: config.logger.level,
        transports: [new winston.transports.Console(), fileTransport]
    })
}

function error(message) {
    log('error', message)
}

function warn(message) {
    log('warn', message)
}

function info(message) {
    log('info', message)
}

function verbose(message) {
    log('verbose', message)
}

function debug(message) {
    if (config.debug.enabled) {
        log('debug', message)
    }
}

function silly(message) {
    log('silly', message)
}

function log(logLevel, message) {
    let text = config.debug.prefix
    if (message instanceof BaseError) {
        text += message.stringify()
    } else if (message instanceof Error) {
        text += message.stack || message
    } else if (typeof message === 'object') {
        text += JSON.stringify(message)
    } else {
        text += message.toString()
    }
    logger.log(logLevel, text)
}

module.exports = {
    SetupLogger,
    error,
    warn,
    info,
    verbose,
    debug,
    silly
}