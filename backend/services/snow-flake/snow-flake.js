const flakeId = require('flakeid')

const flake = new flakeId()

function getIDString() {
    return flake.gen()
}

module.exports = {
    getIDString
}
