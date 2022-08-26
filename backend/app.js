const restServerV1 = require('./server/rest')
const { Setup: setupLogger } = require('./services/logger')
const { logger } = require('./services/logger')
const mongoConnector = require('./db/mongo-connector')

async function main() {
    try {
        initialize()
        await setup()
        await restServerV1.start()
    } catch (error) {
        logger.error(error)
    }
}

main()

function initialize() {
    Date.unix = function () {
        return Math.floor(Date.now() / 1000)
    }
}

async function setup() {
    setupLogger()
    await mongoConnector()
}
