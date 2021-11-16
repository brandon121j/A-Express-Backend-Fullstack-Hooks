const express = require('express');
const router = express.Router();

const {
    addToFavorites,
    getAllFavoriteMovies,
    deleteFavorite
} = require('./controller/moviesController')

const {
    jwtMiddleware,
} = require ('../shared/jwtMiddleware')

router.post('/add-favorite', jwtMiddleware, addToFavorites);

router.delete('/delete/:imdbId', jwtMiddleware, deleteFavorite);

router.get('/', jwtMiddleware, getAllFavoriteMovies);


module.exports = router;