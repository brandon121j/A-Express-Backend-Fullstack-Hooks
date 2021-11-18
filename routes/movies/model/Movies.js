const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    
    title: {
        type: String
    },
    moviePoster: {
        type: String
    },
    imdbLink: {
        type: String
    },
    imdbID : {
        type: String
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('movie', movieSchema);