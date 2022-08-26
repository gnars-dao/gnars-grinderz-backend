const {
    model,
    Schema,
    SchemaTypes: { String }
} = require('mongoose')
const unixTimestamp = require('./plugin/mongoose-timestamp')

const fileSchema = new Schema(
    {
        type: { type: String, enum: ['ads'] },
        file: {
            type: { type: String },
            format: String
        },
        url: String
    },
    {
        versionKey: false
    }
)

fileSchema.plugin(unixTimestamp)

module.exports = model('file', fileSchema, 'files')
