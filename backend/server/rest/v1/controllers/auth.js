const { StatusCodes } = require('http-status-codes')
const restUtils = require('../../../../utils/rest')
const bcrypt = require('../../../../services/bcrypt')
const jwt = require('../../../../services/jwt')
const errors = require('../../../../services/error/errors')
const _ = require('lodash')
const { adminDB } = require('../../../../db')

async function loginAdmin(request, reply) {
    try {
        const admin = await adminDB.findOneByUsername(request.body.username)
        if (_.isNil(admin)) throw errors.DATA_NOT_FOUND

        const success = await bcrypt.checkHash(request.body.password, admin.password)
        if (!success) throw errors.WRONG_PASSWORD

        const token = jwt.getToken({ id: admin._id })
        reply.code(StatusCodes.OK).send({
            token: token
        })
    } catch (error) {
        restUtils.handleException(error, reply)
    }
}

module.exports = {
    loginAdmin
}
