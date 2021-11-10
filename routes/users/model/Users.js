const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        username: {
            type: String,
            unqiue: true
        },
        password: {
            type: String
        },
        usersFavorites: [{ type: mongoose.Schema.ObjectId, ref: 'movie'}]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user', userSchema)