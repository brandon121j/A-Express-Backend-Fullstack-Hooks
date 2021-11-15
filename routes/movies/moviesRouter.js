const express = require('express');
const router = express.Router();

const {
    addToFavorites,
    getAllFavoriteMovies
} = require('./controller/moviesController')

const { jwtMiddleware } = require('../shared/jwtMiddleware')

router.post('/add-favorite', jwtMiddleware, addToFavorites);

router.get('/', jwtMiddleware, getAllFavoriteMovies);




module.exports = router;