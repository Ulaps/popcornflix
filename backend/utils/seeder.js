const Movie = require('../models/movie');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// Setting dotenv file
dotenv.config({ path: 'backend/.env' })

connectDatabase();

const axios = require('axios')

let movies = [];

const getSingleMovie = async(id) => {
    await axios.get(`https://www.omdbapi.com/?apikey=55d24709&i=${id}`)
        .then(response => {
            movies.push({
                title: response.data.Title.substr(0,78),
                showType: 'Movie',
                year: response.data.Year,
                date_released: Date.now(),
                runtime: response.data.Runtime.split(' ')[0],
                genre: 'Drama',
                summary: response.data.Plot,
                posters : [
                    {
                        public_id : `products/${response.data.imdbID}`,
                        url : response.data.Poster
                    }
                ],
                staff:[],
                reviews:[],
            })
        })
}

const getOMDBmovies = async() => {
    for(let i = 1; i < 15; i++){
        await axios.get(`https://www.omdbapi.com/?apikey=55d24709&s=the a&page=${i}`)
        .then(response => {
            response.data.Search.forEach(element => {
                getSingleMovie(element.imdbID);
            });
        })
        .catch(error => {
            console.log(error.message);
        })
    }
}

getOMDBmovies().finally(async()=>{
    try {

        await Movie.deleteMany();
        console.log('Movies are deleted');

        await Movie.insertMany(movies)
        console.log('All Movies are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
});