const File = require('../model/files')
const config = require('../config')

/**
 * Insert new file
 * @param {String} type
 * @param {String} fileType
 * @param {String} format
 * @param {String} url
 * @return {Promise<{ _id: String, type: String, format: String, url: String }>}
 */
async function create(type, fileType, format, url) {
    const file = new File({ type, file: { type: fileType, format }, url })
    return file.save()
}

/**
 * Get files url
 * @return {Promise<{ _id: String, url: String }[]>}
 */
async function getImages() {
    return await File.aggregate()
        .match({ type: 'ads' })
        .project({ id: 1, url: { $concat: [config.settings.cdn_path, '$url'] } })
}

/**
 * Delete a file
 * @param {String} id
 * @return {Promise<{ _id: String, url: String }>}
 */
async function deleteFile(id) {
    return await File.findByIdAndDelete(id).lean()
}

module.exports = {
    create,
    getImages,
    deleteFile
}
