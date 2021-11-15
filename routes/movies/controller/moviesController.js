const Movie = require('../model/Movies');
const User = require('../../users/model/Users');

const addToFavorites = async (req, res) => {
	const { title, moviePoster, imdbLink } = req.body;

	try {
		const decodedData = res.locals.decodedData;

		let foundUser = await User.findOne({ email: decodedData.email });

		const createdFavorite = new Movie({
			title,
			moviePoster,
			imdbLink,
			userID: foundUser._id,
		});

		let savedFavorite = await createdFavorite.save();

		foundUser.usersFavories.push(savedFavorite._id);

		await foundUser.save();

		res.json({ message: 'SUCCESS', createdFavorite });
	} catch (e) {
        res.status(500).json({
            message: "ERROR",
            error: e.message
        });
	}
};

async function getAllFavoriteMovies(req, res) {
    try {
        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        let usersFavorites = await Movie.find({ userID: foundUser._id });

        res.json({ message: "SUCCESS", payload: usersFavorites });
    } catch (e) {
        res.status(500).json({
            message: "ERROR",
            error: e.message
        });
    }
}

const deleteFavorite = async(req, res) => {
	try {
		const fetchedMovie = await Movie.find({imdbId: req.params.imdbId});
		const decodedToken = res.locals.decodedData;

		const deletedMovie = await Movie.findByIdAndDelete(fetchedMovie[0]._id);

		let foundUser = await User.findOne({ email: decodedToken.email });

		let filteredFavorites = foundUser.usersFavorites.filter((item) => {
			item._id.toString() !== deletedMovie._id.toString();
		});

		foundUser.usersFavorites = filteredFavorites;

		await foundUser.save();

		res.json({
			message: "SUCCESS",
			payload: deletedMovie
		});

	} catch(e) {
		res.status(500).json({
			message: "ERROR",
			error: e.message
		})
	}
}

module.exports = {
	addToFavorites,
    getAllFavoriteMovies,
	deleteFavorite
};
