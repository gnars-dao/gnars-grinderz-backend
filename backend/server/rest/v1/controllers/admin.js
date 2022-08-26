const { StatusCodes } = require('http-status-codes')
const errors = require('../../../../services/error/errors')
const restUtils = require('../../../../utils/rest')
const bcrypt = require('../../../../services/bcrypt')
const { adminDB, fileDB } = require('../../../../db')

async function registerAdmin(request, reply) {
    try {
        const admin = await adminDB.findOneByUsername(request.body.username)
        if (admin) throw errors.ADMIN_REGISTERED
        const hashPass = await bcrypt.getHash(request.body.password)
        const newAdmin = await adminDB.create(request.body.username, hashPass)
        delete newAdmin.password
        reply.code(StatusCodes.CREATED).send({ data: newAdmin })
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

async function getImages(request, reply) {
    try {
        const images = await fileDB.getImages()
        reply.code(StatusCodes.OK).send({ data: images })
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

module.exports = {
    registerAdmin,
    getImages
}
