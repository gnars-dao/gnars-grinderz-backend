const {
    model,
    Schema,
    SchemaTypes: { String, Number }
} = require('mongoose')
const unixTimestamp = require('./plugin/mongoose-timestamp')

const leaderboardSchema = new Schema(
    {
        wallet_id: { type: String, required: true },
        nft: {
            id: { type: Number, unique: true, required: true },
            icon: { type: String, default: null }
        },
        score: { type: Number, required: true },
        time: { type: Number, default: () => Date.now() }
    },
    {
        versionKey: false,
        timestamp: false
    }
)

leaderboardSchema.plugin(unixTimestamp)

module.exports = model('leaderboard', leaderboardSchema, 'leaderboard')
