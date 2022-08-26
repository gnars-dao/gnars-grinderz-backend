const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const error = require('../error/errors')

function getAccessToken(payload) {
    return getToken(payload, config.jwt.accessTokenExpiry)
}

function getToken(payload) {
    return jwt.sign(payload, config.jwt.secretKey, {
        expiresIn: config.jwt.accessTokenExpiry
    })
}

function verify(token) {
    try {
        return jwt.verify(token, config.jwt.secretKey)
    } catch (err) {
        throw error.INVALID_TOKEN
    }
}

module.exports = {
    getAccessToken,
    getToken,
    verify
}
