const mongoose = require('mongoose')

const registerTemplate = new mongoose.Schema({
    login: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: Boolean
    }
})

module.exports = mongoose.model('members', registerTemplate)