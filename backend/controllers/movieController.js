const Movie = require('../models/movie');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const swearjar = require('swearjar');
const { query } = require('express');

exports.createMovie = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imageLinks = [];

    for(let i=0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder : 'posters'
        })

        imageLinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    req.body.posters = imageLinks
    req.body.staff = JSON.parse(req.body.staff)

    const movie = await Movie.create(req.body);

    res.status(200).json({
        success:true,
        movie
    })

})

//GET ALL MOVIE WITH FILTER
exports.getAllMovies = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 12;
    const movieCount = await Movie.countDocuments();

    const apiFeatures = new APIFeatures(Movie.find(), req.query).search().filter()

    let movies = await apiFeatures.query;
    let filteredMoviesCount = movies.length;

    apiFeatures.pagination(resPerPage);
    movies = await apiFeatures.query;

    res.status(200).json({
        success:true,
        movieCount,
        resPerPage,
        filteredMoviesCount,
        movies
    })
})

//GET SINGLE MOVIE
exports.getMovie = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)

    if(!movie) return next(new ErrorHandler('ERROR : Movie is not FOUND', 404));

    res.status(200).json({
        success:true,
        movie
    })
})

//UPDATE MOVIE
exports.updateMovie = catchAsyncErrors(async (req, res, next) => {
    let movie = await Movie.findById(req.params.id)

    if(!movie) return next(new ErrorHandler('ERROR : Movie is not FOUND', 404));

    let images = [];

    if(typeof req.body.posters === 'string') {
        images.push(req.body.posters)
    } else {
        images = req.body.posters
    }

    if(images !== undefined){
        //Delete mga posters
        for(let i = 0; i < movie.posters.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(movie.posters[i].public_id)
        }

        //Upload ng bagong posters
        let imageLinks = [];

        for(let i = 0; i < images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder : 'posters'
            })

            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.posters = imageLinks
    }

    req.body.staff = JSON.parse(req.body.staff)

    //Update na talaga
    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success:true,
        movie
    })

})

//DELETE MOVIE
exports.deleteMovie = catchAsyncErrors(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie) return next(new ErrorHandler('ERROR : Movie is not FOUND', 404));

    //Delete nung posters
    for(let i=0; i<movie.posters.length; i++){
        const result = await cloudinary.v2.uploader.destroy(movie.posters[i].public_id);
    }

    //Delete nung movies talaga
    await movie.remove();

    res.status(200).json({
        success:true,
        message:'Movie REMOVE'
    })

})

//CREATE NG REVIEW
exports.createMovieReview = catchAsyncErrors(async (req, res, next) => {
    const {rating, comment,movieId,user} = req.body

    const review = {
        user : user._id,
        name : user.name,
        rating : Number(rating),
        comment : swearjar.censor(comment)
    }

    const movie = await Movie.findById(movieId);

    const isReviewed = movie.reviews.find(
        r => r.user.toString() === user._id.toString()
    )

    if(isReviewed) {

        movie.reviews.forEach(review => {
            if(review.user.toString() === user._id.toString()) {
                review.comment = swearjar.censor(comment);
                review.rating = rating;
            }
        })
    } else {
        movie.reviews.push(review);
        movie.numofReviews = movie.reviews.length
    }

    movie.ratings = movie.reviews.reduce((acc, item) =>  item.rating + acc, 0) / movie.reviews.length

    const movieReview = await movie.save({validateBeforeSave : false});

    res.status(200).json({
        success:true,
        message:'Movie Review Created',
        reviews: movieReview.reviews
    })
})

//DELETE ng review
exports.deleteMovieReview = catchAsyncErrors(async(req, res, next) => {
    const movie = await Movie.findById(req.query.movieId);

    const reviews = movie.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const rating = movie.rating = movie.reviews.reduce((acc, item) =>  item.rating + acc, 0) / movie.reviews.length

    await Movie.findByIdAndUpdate(req.query.movieId, {
        reviews,
        rating
    }, {
        new : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        message : 'Review Deleted'
    })
})

//SEARCH ng Movie
exports.getSearchMovie = catchAsyncErrors(async (req, res, next) =>{
    const titles = await Movie.distinct('title');

    res.status(200).json({
        success : true,
        titles
    })
})
