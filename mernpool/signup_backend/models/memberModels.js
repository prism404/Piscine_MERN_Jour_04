const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    email: {
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Boolean
    }
})

const Member = mongoose.model('members', memberSchema)
module.exports = Member