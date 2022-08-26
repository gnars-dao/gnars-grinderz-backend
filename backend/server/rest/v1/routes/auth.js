const controllers = require('../controllers/auth')

function setup(fastify, options, done) {
    fastify.post('/login', controllers.loginAdmin)
    done()
}

module.exports = setup
