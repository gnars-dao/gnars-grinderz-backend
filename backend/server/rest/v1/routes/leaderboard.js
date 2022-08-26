const controllers = require('../controllers/leaderboard')

function setup(fastify, options, done) {
    fastify.post('/set', controllers.setLeaderboardScore)
    fastify.post('/get', controllers.getLeaderboardScore)
    fastify.get('/', controllers.getLeaderboard)
    fastify.get('/images', controllers.getImages)

    done()
}

module.exports = setup
