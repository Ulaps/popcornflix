const Movie = require('../models/movie');
const Staff = require('../models/staff');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');


// TOP 10 RATED NG MOVIES LANG
exports.getTopRatedMovies = catchAsyncErrors(async (req,res,next) => {
    const movies = await Movie.find({ showType:"Movie"}).sort({ratings: -1}).limit(10);
    // const movies = await Movie.find().sort({ratings: -1}).limit(10);

    let top = [];

    for(let i =0; i < movies.length; i++) {
        top.push({
            "_id": movies[i]._id,
            "title": movies[i].title,
            "ratings":movies[i].ratings,
            "avatar": movies[i].posters[0].url
        })
    }

    res.status(200).json({
        success:true,
        count: movies.length,
        movies: top
    })
})

// TOP 10 RATED NG TV SHOW LANG
exports.getTopRatedTvShow = catchAsyncErrors(async (req,res,next) => {
    const movies = await Movie.find({ showType:"TV Show"}).sort({ratings: -1}).limit(10);
    // const movies = await Movie.find().sort({ratings: -1}).limit(10);

    let top = [];

    for(let i =0; i < movies.length; i++) {
        top.push({
            "_id": movies[i]._id,
            "title": movies[i].title,
            "ratings":movies[i].ratings,
            "avatar": movies[i].posters[0].url
        })
    }

    res.status(200).json({
        success:true,
        count: movies.length,
        movies: top
    })
})

// TOP 10 RATED ACTORS AND ACTRESS LANG
exports.getTopRatedActors = catchAsyncErrors(async (req,res,next) => {
    const actors = await Staff.find({ work: { $in : ["Actor","Actress"] } }).sort({ratings: -1}).limit(10);

    let top = [];

    for(let i =0; i < actors.length; i++) {
        top.push({
            "_id": actors[i]._id,
            "name": actors[i].name,
            "ratings":actors[i].ratings,
            "avatar": actors[i].avatar[0].url,
        })
    }

    res.status(200).json({
        success:true,
        count: actors.length,
        actors: top,
    })
})

// POPULAR SA MOVIE (TOP 10 NA MARAMING REVIEW)
exports.getPopularMovies = catchAsyncErrors(async (req,res,next) => {
    const movies = await Movie.find({ showType:"Movie"});
 
    const newMovies = sortItems(movies).splice(0,10);

    res.status(200).json({
        sucess:true,
        movies : newMovies,
        labels: newMovies.map(k => k.title),
        values: newMovies.map(v => v.reviews.length),
    })
})

function sortItems(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1; j++) {
			if (array[j].reviews.length < array[j + 1].reviews.length) {
				let temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	return array;
}

// POPULAR GENRES (kung ano pinakamaraming movie genre)
exports.getPopularGenre = catchAsyncErrors(async (req,res,next) => {
    const genres = await Movie.aggregate([
        { $group : { 
            _id : "$genre", 
            count : { $sum : 1}
        }},
        { $group : {
            _id: null,
            counts: {
                $push: { "k": "$_id", "v": "$count" }
            }
        } },
        { $replaceRoot : {
            "newRoot": { "$arrayToObject": "$counts" }
        } } ,
        { $sort : { count : -1}}
     ])

     let genre = [];

     Object.keys(genres[0]).map((item => { return genre.push(
         {  label: item , 
            data: [genres[0][item]],
            backgroundColor: 'rgba(255, 99, 132, 0.5)' 
        }
    )}))

     res.status(200).json({
         success:true,
         genres: genre,
         labels: genre.map(g => g.label),
         values: genre.map(g => g.data[0]),
     })
})

// TOP 5 GROSSING FILMS LNG
exports.getTopGrossingFilm = catchAsyncErrors(async (req,res,next) => {
    const films = await Movie.find({ showType : "Film"}).sort({gross: -1}).limit(5);

    let top = [];

    for(let i =0; i < films.length; i++) {
        top.push({
            "_id": films[i]._id,
            "title": films[i].title,
            "gross": films[i].gross
        })
    }

    res.status(200).json({
        success:true,
        films:top,
        labels:top.map(k=>k.title),
        values:top.map(v=>v.gross)
    })
})

// TOP 5 GROSSING TV SHOW
exports.getTopGrossingTvShow = catchAsyncErrors(async (req,res,next) => {
    const tvshows = await Movie.find({ showType : "TV Show"}).sort({gross: -1}).limit(5);

    let top = [];

    for(let i =0; i < tvshows.length; i++) {
        top.push({
            "_id": tvshows[i]._id,
            "title": tvshows[i].title,
            "gross": tvshows[i].gross
        })
    }

    res.status(200).json({
        success:true,
        tvshows:top,
        labels:top.map(k=>k.title),
        values:top.map(v=>v.gross)
    })
})