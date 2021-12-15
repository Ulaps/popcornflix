const express = require('express');
const router = express.Router();

const { 
    getAllMovies,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    createMovieReview,
    deleteMovieReview,
    getSearchMovie
} = require('../controllers/movieController');

router.route('/movies').get(getAllMovies);
router.route('/movies/create').post(createMovie);
router.route('/movies/:id').get(getMovie);
router.route('/movies/:id').put(updateMovie);
router.route('/movies/:id').delete(deleteMovie);
router.route('/review').put(createMovieReview);
router.route('/delreview').delete(deleteMovieReview);
router.route('/movie/search').get(getSearchMovie);

module.exports = router