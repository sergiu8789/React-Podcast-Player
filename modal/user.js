const mongoose = require('mongoose')

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpasswords: String
})

const User = mongoose.model('User',user)
module.exports = User 