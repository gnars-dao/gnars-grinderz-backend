const BaseError = require('../services/error/base-error')
const { StatusCodes } = require('http-status-codes')
const _ = require('lodash')
const { logger } = require('../services/logger')

async function handleException(error, reply) {
    logger.error(error)
    if (error instanceof BaseError) {
        return reply.code(error.httpCode).send(error.toJSON())
    } else if (error instanceof Error) {
        return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: error.toString(),
            code: StatusCodes.INTERNAL_SERVER_ERROR
        })
    } else {
        return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

function getNoErrorStatus(data) {
    if (_.isNil(data)) {
        return StatusCodes.NO_CONTENT
    }
    return StatusCodes.OK
}

module.exports = {
    handleException,
    getNoErrorStatus
}
