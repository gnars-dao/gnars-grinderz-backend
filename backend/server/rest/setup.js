const config = require('../../config')
const path = require('path')
const leaderboardRoutes = require('./v1/routes/leaderboard')
const authRoutes = require('./v1/routes/auth')
const adminRoutes = require('./v1/routes/admin')
const uploadRoute = require('./v1/routes/upload')
const { adminSeeder } = require('./v1/seeds')

const fastify = require('fastify')({
    logger: config.server.restApi.logger ? { prettyPrint: { colorize: true } } : false,
    ignoreTrailingSlash: true
})

// Run the server!
const start = async () => {
    try {
        setupRoutes()
        setupCors()
        await adminSeeder()
        await fastify.listen(config.server.restApi.port, config.server.restApi.host)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

function setupRoutes() {
    fastify.register(require('fastify-static'), {
        root: path.join(config.rootDir, 'public'),
        prefix: '/public/'
    })
    fastify.register(leaderboardRoutes, { prefix: '/v1/leaderboard' })
    fastify.register(authRoutes, { prefix: '/v1/auth' })
    fastify.register(adminRoutes, { prefix: '/v1/admin' })
    fastify.register(uploadRoute, { prefix: '/v1/upload' })
}

function setupCors() {
    fastify.register(require('fastify-cors'), {
        allowedHeaders: config.server.cors.headers,
        credentials: config.server.cors.credentials,
        methods: config.server.cors.methods,
        origin: config.server.cors.origin,
        preflightContinue: config.server.cors.preflightContinue
    })
}

module.exports.start = start
