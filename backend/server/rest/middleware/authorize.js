const _ = require('lodash')
const restUtils = require('../../../utils/rest')
const errors = require('../../../services/error/errors')
const jwt = require('../../../services/jwt')

async function authorize(request, reply) {
    try {
        const token = request.headers['authorization']
        if (!_.isString(token)) {
            throw errors.NOT_AUTHORIZED
        }
        const payload = jwt.verify(token)
        if (!_.isString(payload.id)) {
            throw errors.NOT_AUTHORIZED
        }
        request.headers.id = payload.id
        return
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

module.exports = {
    authorize
}
