const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Required Title'],
        trim : true,
        maxLenght : [50, 'Title too long']
    },
    showType : {
        type : String,
        required : [true, 'Required Type'],
        enum : [
            'Movie',
            'TV Series'
        ]
    },
    year : {
        type : String,
        default : new Date().getFullYear()
    },
    date_released : {
        type : Date,
        default : Date.now,
    },
    runtime : {
        type : String,
        require : [true, 'Required Runtime']
    },
    posters : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    summary : {
        type : String,
        required : [true, 'Required Summary']
    },
    staff : [
        {
            staff : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true
            },
            name : {
                type : String,
                required : [true, 'Required Name']
            },
            role : {
                type: String,
                required: [true, 'Required role'],
                enum: {
                    values: [
                        'Actor',
                        'Actress',
                        'Director',
                        'Producer'
                    ],
                    message: 'Select role for this person'
                }
            }
        }
    ],
    genre : {
        type: String,
        required: [true, 'Required Genre'],
        enum: {
            values: [
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
            ],
            message: 'Select genre for movie'
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews : [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    created_at : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Movie', movieSchema);