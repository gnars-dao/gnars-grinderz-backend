const controllers = require('../controllers/admin')
const authHook = require('../../middleware/authorize')

function setup(fastify, options, done) {
    fastify.addHook('onRequest', async (request, reply) => {
        await authHook.authorize(request, reply)
    })

    fastify.post('/register', controllers.registerAdmin)
    fastify.get('/images', controllers.getImages)

    done()
}

module.exports = setup
