/*!
 * Mongoose unix timing Plugin
 * Copyright(c) 2019 Mark Rady
 * Original work Copyright(c) 2019 Intcore
 */

function plugin(schema) {
    // init column name
    var updated_at_column = 'updated_at'
    var created_at_column = 'created_at'
    // init column type
    var updated_at_options = Number
    var created_at_options = Number
    // payload
    var timestamp = {}

    // set options
    if (!schema.path(updated_at_column) && updated_at_column) {
        timestamp[updated_at_column] = updated_at_options
    }

    if (schema.path(created_at_column)) {
        if (!schema.path(updated_at_column) && updated_at_column) {
            schema.add(timestamp)
        }

        schema.pre('save', function (next) {
            if (this.isNew) {
                var newDate = getUnixTime()
                if (created_at_column) this[created_at_column] = newDate
                if (updated_at_column) this[updated_at_column] = newDate
            } else if (this.isModified() && updated_at_column) {
                this[updated_at_column] = getUnixTime()
            }
            next()
        })
    } else {
        if (created_at_column) {
            timestamp[created_at_column] = created_at_options
        }
        if (timestamp[created_at_column] || timestamp[updated_at_column]) {
            schema.add(timestamp)
        }
        schema.pre('save', function (next) {
            if (!this[created_at_column]) {
                var newDate = getUnixTime()
                if (created_at_column) this[created_at_column] = newDate
                if (updated_at_column) this[updated_at_column] = newDate
            } else if (this.isModified() && updated_at_column) {
                this[updated_at_column] = getUnixTime()
            }
            next()
        })
    }

    schema.pre('findOneAndUpdate', function (next) {
        if (this.op === 'findOneAndUpdate') {
            var newDate = getUnixTime()
            this._update = this._update || {}
            if (created_at_column) {
                if (this._update[created_at_column]) {
                    delete this._update[created_at_column]
                }
                this._update['$setOnInsert'] = this._update['$setOnInsert'] || {}
                this._update['$setOnInsert'][created_at_column] = newDate
            }
            if (updated_at_column) {
                this._update[updated_at_column] = newDate
            }
        }
        next()
    })

    schema.pre('update', function (next) {
        if (this.op === 'update') {
            var newDate = getUnixTime()
            this._update = this._update || {}
            if (created_at_column) {
                if (this._update[created_at_column]) {
                    delete this._update[created_at_column]
                }
                this._update['$setOnInsert'] = this._update['$setOnInsert'] || {}
                this._update['$setOnInsert'][created_at_column] = newDate
            }
            if (updated_at_column) {
                this._update[updated_at_column] = newDate
            }
        }
        next()
    })

    schema.pre('updateMany', function (next) {
        if (this.op === 'updateMany') {
            var newDate = getUnixTime()
            this._update = this._update || {}
            if (created_at_column) {
                if (this._update[created_at_column]) {
                    delete this._update[created_at_column]
                }
                this._update['$setOnInsert'] = this._update['$setOnInsert'] || {}
                this._update['$setOnInsert'][created_at_column] = newDate
            }
            if (updated_at_column) {
                this._update[updated_at_column] = newDate
            }
        }
        next()
    })

    schema.pre('updateOne', function (next) {
        if (this.op === 'updateOne') {
            var newDate = getUnixTime()
            this._update = this._update || {}
            if (created_at_column) {
                if (this._update[created_at_column]) {
                    delete this._update[created_at_column]
                }
                this._update['$setOnInsert'] = this._update['$setOnInsert'] || {}
                this._update['$setOnInsert'][created_at_column] = newDate
            }
            if (updated_at_column) {
                this._update[updated_at_column] = newDate
            }
        }
        next()
    })

    schema.pre('insertMany', function (next, docs) {
        const newDate = getUnixTime()
        for (let doc of docs) {
            doc._doc[created_at_column] = newDate
            doc._doc[updated_at_column] = newDate
        }
        next()
    })

    if (!schema.methods.hasOwnProperty('touch') && updated_at_column) {
        schema.methods.touch = function (callback) {
            this[updated_at_column] = getUnixTime()
            this.save(callback)
        }
    }
}

function getUnixTime() {
    return Math.floor(Date.now() / 1000)
}

module.exports = plugin
