const bcrypt = require('bcrypt')
const saltRounds = 10

async function getHash(myPlaintext) {
    return await bcrypt.hash(myPlaintext, saltRounds)
}

async function checkHash(myPlaintext, hash) {
    return await bcrypt.compare(myPlaintext, hash)
}

module.exports = {
    getHash,
    checkHash
}
