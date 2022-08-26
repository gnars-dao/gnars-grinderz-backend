const controllers = require('../controllers/upload')
const authHook = require('../../middleware/authorize')
const config = require('../../../../config')

function setup(fastify, options, done) {
    fastify.addHook('onRequest', async (request, reply) => {
        await authHook.authorize(request, reply)
        return
    })

    fastify.register(require('fastify-multipart'), {
        limits: config.settings.upload.limits
    })

    fastify.post('/image', controllers.uploadImage)
    fastify.delete('/image/:id', controllers.deleteImage)

    done()
}

module.exports = setup
