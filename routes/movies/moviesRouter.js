const express = require('express');
const router = express.Router();

const {
    addToFavorites,
    getAllFavoriteMovies
} = require('./controller/moviesController')

const {
    jwtMiddleware,
    emptyValidator,
    undefinedValidator,
    createDataValidator,
    loginDataValidator
} = require ('../shared/index')
router.post('/add-favorite', jwtMiddleware, addToFavorites);

router.get('/', jwtMiddleware, getAllFavoriteMovies);




module.exports = router;