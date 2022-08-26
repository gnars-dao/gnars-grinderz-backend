const config = require('../config')
const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

/**
 * return paginations options
 * @param {Number} page
 * @param {Number} size
 * @param {{limit: Number, skip: Number}}
 */
function getPagination(page, size) {
    const limit = size ? size : 15
    const skip = page ? page * limit : 0
    return { limit, skip }
}

/**
 * Split a string by a character
 * @param {String} string
 * @param {String} character
 * @return {String[]}
 */
function stringSplitter(string, character) {
    return string.split(character)
}

/**
 * Get time ago
 * @param {Number} time
 * @param {String}
 */
function calculateTimeAgo(time) {
    return timeAgo.format(time)
}

/**
 * Get path & link of file
 * @param {String} fileName
 * @return {{filePath: String, link: String, path: String }}
 */
function getFilePath(fileName) {
    const path = config.settings.upload.uploadDir + 'images/' + fileName
    const link = config.settings.cdn_path + path
    return { filePath: config.rootDir + path, link, path }
}

module.exports = {
    getPagination,
    stringSplitter,
    calculateTimeAgo,
    getFilePath
}
