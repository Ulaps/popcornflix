const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name Required']
    },
    work : {
        type : String,
        required : [true, 'Work Role Required'],
        enum : {
            values: [
                'Actor',
                'Actress',
                'Director',
                'Producer',
            ],
            message: 'Please select correct role for this person'
        }
    },
    info : {
        type : String,
        default : 'Info not set'
    },
    avatar : [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    ratings : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    created_at : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Staff', staffSchema);