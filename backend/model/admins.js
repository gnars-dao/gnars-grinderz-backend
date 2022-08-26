const {
    Schema,
    SchemaTypes: { String },
    model
} = require('mongoose')
const unixTimestamp = require('./plugin/mongoose-timestamp')

const adminSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamp: false
    }
)

adminSchema.plugin(unixTimestamp)

module.exports = model('admins', adminSchema, 'admins')
