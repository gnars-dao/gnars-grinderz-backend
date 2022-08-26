const BaseError = require('./base-error')

const errors = {
    UNKNOWN_ERROR: {
        httpCode: 500,
        code: 1001,
        message: 'Unknown server error.'
    },
    DATA_NOT_FOUND: {
        httpCode: 404,
        code: 1002,
        message: 'Requested data not found.'
    },
    INVALID_TOKEN: {
        httpCode: 401,
        code: 1003,
        message: 'Your authorization token is invalid.'
    },
    NOT_AUTHORIZED: {
        httpCode: 401,
        code: 1004,
        message: 'You do not have access to this route.'
    },
    ADMIN_REGISTERED: {
        httpCode: 400,
        code: 1005,
        message: `Admin found can't register.`
    },
    WRONG_PASSWORD: {
        httpCode: 400,
        code: 1006,
        message: 'Wrong password was entered.'
    },
    CREATE_FILE: {
        httpCode: 500,
        code: 1007,
        message: `Cant Store uploaded file.`
    },
    MAX_IMAGE_STORE: {
        httpCode: 405,
        code: 1008,
        message: `The maximum number of stored images is 10.`
    }
}

const errorsProxy = new Proxy(errors, {
    get: function (obj, prop) {
        return new BaseError(obj[prop])
    }
})

module.exports = errorsProxy
