const Movie = require('../models/movie');
const User = require('../models/user');
const Staff = require('../models/staff');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// const movies = require('../data/movies');
const user = require('../data/user');

// Setting dotenv file
dotenv.config({ path: 'backend/.env' })

connectDatabase();

const axios = require('axios')

let movies = [];

let genres = [
    'Thriller',
    'Horror',
    'Sci-Fi',
    'Fantasy',
    'Drama',
    'Documentation',
    'Comedy',
    'War',
    'Sports',
    'Crime',
    'Action',
    'Musicals',
    'Mystery',
    'Romance'
]

let showType = [
    'TV Show',
    'Film',
    'Movie'
]

const getSingleMovie = async(id) => {
    await axios.get(`https://www.omdbapi.com/?apikey=55d24709&i=${id}`)
        .then(response => {
            movies.push({
                title: response.data.Title.substr(0,78),
                year: response.data.Year,
                ratings: parseInt(Math.random() * 11),
                showType: showType[parseInt(Math.random() * 3)],
                date_released: Date.now(),
                runtime: response.data.Runtime.split(' ')[0],
                genre: genres[parseInt(Math.random() * 14)],
                summary: response.data.Plot,
                gross: parseInt(Math.random() * 1000000),
                posters : [
                    {
                        public_id : `products/${response.data.imdbID}`,
                        url : response.data.Poster
                    }
                ],
                staffs:[],
                reviews:[],
            })
        })
}

const getOMDBmovies = async() => {
    for(let i = 1; i < 20; i++){
        await axios.get(`https://www.omdbapi.com/?apikey=433d52cd&type=movie&s=That the&page=${i}`)
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

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

const seedStaffs = async () => {
    try {
        let staffs = [];
        let roles = [
            'Actor',
            'Actress',
            'Director',
            'Producer'
        ];

            await axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(response => {
                for(let i = 1; i <= 10; i++){
                    response.data.forEach(element => {
                        staffs.push({
                            name:element.name,
                            work:roles[Math.floor(Math.random()*3) + 1],
                            info:element.company.catchPhrase,
                            ratings: getRandomNumberBetween(1,5),
                            avatar: [
                                {
                                    public_id:element.name,
                                    url:`https://ui-avatars.com/api/?name=${element.name}`
                                }
                            ]
                        })
                    })
                }
            })
            .finally(() => {
                Staff.deleteMany();
                Staff.insertMany(staffs);
            })

    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedStaffs();

const seedUsers = async () => {
    try {
        await User.deleteMany();
        console.log('Users are deleted');
        
        await User.insertMany(user)
        console.log('All users are added.');
        
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedUsers()

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