const mongoose = require('mongoose')

const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : [true, 'NAME IS REQUIRED']
    },
    email : {
        type : String,
        required : [true, 'EMAIL IS REQUIRED'],
        unique : [true, 'EMAIL IS TAKEN'],
        validate : [validator.isEmail, 'EMAIL NOT VALID']
    },
    avatar : [
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
    role: {
        type : String,
        required : [true, 'Role Required'],
        enum : {
            values: [
                'Admin',
                'User'
            ],
            message: 'Incorrect Role'
        }
    }
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', userSchema);