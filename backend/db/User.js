const mongoose = require('mongoose')
// create user schema hare
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isBlock: {
        type: Boolean,
        default: false
    },
    favorites: [String]
})

const userModel = mongoose.model('users', userSchema, 'users')

module.exports = userModel
