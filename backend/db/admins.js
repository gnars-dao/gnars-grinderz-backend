const Admin = require('../model/admins')

async function create(username, password) {
    const admin = new Admin({ username, password })
    return await admin.save()
}

async function createAdmin(password) {
    return await Admin.findOneAndUpdate({ username: 'admin' }, { password }, { upsert: true }).lean()
}

async function findOneByUsername(username) {
    return await Admin.findOne({ username }).lean()
}

module.exports = {
    createAdmin,
    create,
    findOneByUsername
}
