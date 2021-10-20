const { Schema, model } = require('mongoose')

const admin = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('admin', admin)