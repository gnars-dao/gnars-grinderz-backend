const { StatusCodes } = require('http-status-codes')
const restUtils = require('../../../../utils/rest')
const config = require('../../../../config')
const path = require('path')
const fs = require('fs')
const utils = require('../../../../utils/utils')
const { fileDB } = require('../../../../db')
const errors = require('../../../../services/error/errors')
const idGen = require('../../../../services/snow-flake')
const util = require('util')
const { pipeline } = require('stream')
const pump = util.promisify(pipeline)

async function uploadImage(request, reply) {
    try {
        if (!request.isMultipart()) {
            throw errors.UNKNOWN_ERROR
        }
        const images = await fileDB.getImages()
        if (images.length >= 10) {
            throw errors.MAX_IMAGE_STORE
        }

        const fileData = await request.file()
        const data = await createFile(fileData)

        if (!fs.existsSync(data.filePath)) {
            throw errors.CREATE_FILE
        }

        const fileDetail = await fileDB.create('ads', data.mimetype[0], data.mimetype[1], data.path)
        if (!fileDetail) {
            fs.unlinkSync(data.filePath)
            throw errors.UNKNOWN_ERROR
        }

        reply.code(StatusCodes.NO_CONTENT).send()
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

async function deleteImage(request, reply) {
    try {
        const file = await fileDB.deleteFile(request.params.id)
        if (!file) {
            throw errors.DATA_NOT_FOUND
        }
        fs.unlinkSync(path.join(config.rootDir, file.url))

        reply.code(StatusCodes.OK).send()
    } catch (e) {
        restUtils.handleException(e, reply)
    }
}

module.exports = {
    uploadImage,
    deleteImage
}

async function createFile(fileData) {
    const fileName = idGen.getIDString() + path.extname(fileData.filename)

    const file = utils.getFilePath(fileName)

    await pump(fileData.file, fs.createWriteStream(file.filePath))

    const mimetype = utils.stringSplitter(fileData.mimetype, '/')
    return { mimetype, filePath: file.filePath, path: file.path, link: file.link }
}
